/**
 * CompanyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  all: async (req, res) => {

    let page = req.query.page || 1;
    let limit = req.query.perPage || 20;
    let offset = limit * (page - 1);

    let companies = await Company.find({
      select: ['id','name', 'requisites'],
      skip: offset,
      limit: limit,
      sort: [
        { inner: 'ASC' },
        { createdAt: 'ASC' }
      ]
    });

    let count = await Company.count();

    return res.ok({
      companies: {
        count: count,
        page: page,
        perPage: limit,
        list: companies
      }
    });

  },

  list: async (req, res) =>{

    let companies = await Company.find({
      select: ['id', 'name'],
      sort: 'name ASC'
    });

    if (req.query.withBankAccounts) {
      
    }

    return res.ok({
      companies: companies
    });

  },

  find: async (req, res) => {

    let company = await Company.findOne({ id: parseInt(req.params.id) })
      .populate('bankAccounts');

    return res.ok({
      company: company
    });

  },

  store: async (req, res) =>{
    let company = await Company.create({
      name:req.body.name,
      requisites: req.body.requisites,
      inner: req.body.inner || false,
    }).fetch();

    return res.ok({
      company
    });
  },

  update: async (req, res) => {

    let company = await Company.updateOne({ id:req.params.id })
    .set({
      name:req.body.name,
      requisites: req.body.requisites,
    });

    return res.ok(company);
  },

  destroy: async (req, res)=>{
    let company = await Company.archiveOne({ id: req.body.id });
    return res.ok(company);
  },

};

