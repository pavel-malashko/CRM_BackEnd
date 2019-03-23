/**
 * BankAccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: async (req, res) => {

    let page = req.query.page || 1;
    let limit = req.query.perPage || 20;
    let offset = limit * (page - 1);

    let bankAccounts = await BankAccount.find({
      skip: offset,
      limit: limit,
      sort: 'createdAt ASC'
    }).populate('company');

    let count = await BankAccount.count();

    return res.ok({
      bankAccounts: {
        count: count,
        page: page,
        perPage: limit,
        list: bankAccounts
      }
    });

  },

  codeTypes: async (req, res) => {
    return res.ok({
      codeTypes: BankAccount.codeTypes()
    });
  },

  store: async (req, res) => {

    let bankAccount = await BankAccount.create({
      bankName: req.body.bankName,
      iban: req.body.iban,
      code: req.body.code,
      codeType: req.body.codeType.toUpperCase(),
      comment: req.body.comment,
      user: req.user.id,
      company: req.body.company
    }).fetch();

    return res.ok({
      bankAccount
    });
  },

  update: async (req, res) => {

    let bankAccount = await BankAccount.updateOne({ id:req.params.id })
      .set({
        bankName: req.body.bankName,
        iban: req.body.iban,
        code: req.body.code,
        codeType: req.body.codeType.toUpperCase(),
        comment: req.body.comment,
      });

    return res.ok({
      bankAccount
    });

  },

  destroy: async (req, res) => {
    let bankAccount = await BankAccount.archiveOne({ id: parseInt(req.body.id) });
    return res.ok(bankAccount);
  },

};

