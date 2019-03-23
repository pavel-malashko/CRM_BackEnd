/**
 * CurrencyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: async (req, res) => {
    let currencies = await Currency.find({ sort: 'name ASC' });
    return res.ok({
      currencies: currencies
    })
  },

};

