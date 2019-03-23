/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

  search: async (req, res) => {

    const orderByCols = {
      id: 'id',
      amount: 'amount',
      fromAccount: 'fromAccount_company_name',
      toAccount: 'toAccount_company_name',
      date: 'date',
    };

    let page = _.isNumber(req.body.page) ? req.body.page : 1;
    let limit = _.isNumber(req.body.perPage) ? req.body.perPage : 20;
    let offset = limit * (page - 1);

    let sortBy = _.keys(orderByCols).includes(req.body.sortBy)
      ? orderByCols[req.body.sortBy]
      : 'id';
    let sortDirection = ['ASC', 'DESC'].includes((req.body.sortDirection || '').toUpperCase())
      ? req.body.sortDirection
      : 'ASC';

    console.log(sortBy, sortDirection);

    let where = { and: [] };
    let sd = req.body.searchForm;
    if (sd) {
      if (sd.dateFrom) where.and.push({ date: { '>=': new Date(sd.dateFrom).getTime() }});
      if (sd.dateTo) where.and.push({ date: { '<': new Date(sd.dateTo).getTime() + 86400000 }});
      if (sd.amountFrom && /^[0-9]*$/.test(sd.amountFrom)) where.and.push({ amount: { '>=': parseFloat(sd.amountFrom).toFixed(2) }});
      if (sd.amountTo && /^[0-9]*$/.test(sd.amountTo)) where.and.push({ amount: { '<=': parseFloat(sd.amountTo).toFixed(2) }});
      if (sd.fromAccount) where.fromAccount_company_id = parseInt(sd.fromAccount);
      if (sd.toAccount) where.toAccount_company_id = parseInt(sd.toAccount);
      if (sd.currency) where.currency_id = parseInt(sd.currency);
    }

    let transactions = await TransactionView.find({
      where: where,
      skip: offset,
      limit: limit,
      sort: `${sortBy} ${sortDirection}`
    });

    let count = await BankAccount.count();

    return res.ok({
      transactions: {
        count: count,
        page: page,
        perPage: limit,
        list: transactions
      }
    });

  },

  find: async (req, res) => {

    let transaction = await Transaction.findOne({ id: parseInt(req.params.id) })
      .populate('currency')
      .populate('fromAccount')
      .populate('toAccount');

    transaction.fromAccount.company = await Company.findOne({ id: transaction.fromAccount.company });
    transaction.toAccount.company = await Company.findOne({ id: transaction.toAccount.company });

    return res.ok({
      transaction,
    });

  },

  destroy: async (req, res) => {
    let transaction = await Transaction.archiveOne({ id: parseInt(req.body.id) });
    return res.ok(transaction);
  },

};

