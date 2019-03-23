/**
 * Company.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'transaction',

  attributes: {
    purpose: {
      type: 'string',
      columnType: 'varchar(500)',
      required: true,
      maxLength: 500,
    },
    amount: {
      type: 'number',
      columnType: 'double',
    },
    date: {
      type: 'number',
      columnType: 'bigint',
    },
    documents: {
      collection: 'Document',
      via: 'transactions'
    },
    currency: {
      model: 'Currency'
    },
    fromAccount: {
      model: 'BankAccount'
    },
    toAccount: {
      model: 'BankAccount'
    },
    user: {
      model: 'User'
    },
  },

};

