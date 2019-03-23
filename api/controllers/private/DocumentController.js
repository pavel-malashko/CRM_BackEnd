/**
 * DocumentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: async (req, res) => {

    let page = req.query.page || 1;
    let limit = req.query.perPage || 20;
    let offset = limit * (page - 1);

    let documents = await Document.find({
      //select: ['id','date','amount','comment','number','type'],
      skip: offset,
      limit: limit,
    }).populate('type')
      .populate('currency')
      .populate('contractor')
      .populate('customer');

    let count = await Document.count();

    return res.ok({
      documents: {
        count: count,
        page: page,
        perPage: limit,
        list: documents,
      }
    });

  },

  find: async (req, res) => {

    let document = await Document.findOne({ id: parseInt(req.params.id) });

    return res.ok({
      document: document,
    });

  },

  types: async (req, res) => {

    let types = await DocumentType.find({
      select: ['id','name'],
      sort: 'name ASC'
    });

    return res.ok(types);

  },

  store: async (req, res)=>{

    if (! sails.hooks.storage.validate(req.body.file, Document.appliedExtensions, 1)) {
      return res.badRequest(`Разрешенные типы файлов: ${Document.appliedExtensions.join(',')}`);
    }
    let files = await sails.hooks.storage.upload(req.body.file.upstream, 'Document');

    let document = await Document.create({
      file: files[0],
      date: new Date(req.body.date).getTime(),
      amount: req.body.amount,
      comment: req.body.comment,
      number: req.body.number,
      type: req.body.type,
      user: req.user.id,
      contractor: req.body.contractor,
      customer: req.body.customer,
      currency: req.body.currency,
    }).fetch();

    return res.ok(document);

  },

  update: async (req, res)=>{

    let data = {
      date: new Date(req.body.date).getTime(),
      amount: req.body.amount,
      comment: req.body.comment,
      number: req.body.number,
      type: req.body.type,
      user: req.user.id,
      contractor: req.body.contractor,
      customer: req.body.customer,
      currency: req.body.currency,
    };

    if (req.body.file) {
      if (! sails.hooks.storage.validate(req.body.file, Document.appliedExtensions, 1)) {
        return res.badRequest(`Разрешенные типы файлов: ${Document.appliedExtensions.join(',')}`);
      }
      let files = await sails.hooks.storage.upload(req.body.file.upstream, 'Document');
      data.file = files[0];
    }

    let document = await Document.updateOne({ id: parseInt(req.params.id) }).set(data);

    return res.ok(document);

  },

  destroy: async (req, res)=>{
    let document = await Document.archiveOne({ id: pasrseInt(req.body.id) });
    return res.ok(document);
  },

};

