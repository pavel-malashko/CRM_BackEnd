/**
 * Company.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'transaction_view',

  migrate: 'safe',

  attributes: {
    purpose: {
      type: 'string',
    },
    amount: {
      type: 'number',
    },
    date: {
      type: 'number',
    },
    currency_id: {
      type: 'number',
    },
    currency_name: {
      type: 'string',
    },
    fromAccount_id: {
      type: 'number',
    },
    fromAccount_iban: {
      type: 'string',
    },
    fromAccount_company_id: {
      type: 'number',
    },
    fromAccount_company_name: {
      type: 'string',
    },
    toAccount_id: {
      type: 'number',
    },
    toAccount_iban: {
      type: 'string',
    },
    toAccount_company_id: {
      type: 'number',
    },
    toAccount_company_name: {
      type: 'string',
    },
    createdAt: false,
    updatedAt: false,
  },

  customToJSON: function() {
    return _.transform(this, (result, value, key) => {
      _.set(result, key.replace(/_/g, '.'), value);
    }, {});
  }

};

