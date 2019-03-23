/**
 * Company.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'company',

  attributes: {
    name: {
      type: 'string',
      columnType: 'varchar(255)',
      required: true,
      maxLength: 255,
    },
    requisites: {
      type: 'json',
      columnType: 'JSON',
      defaultsTo: {},
    },
    inner: {
      type: 'boolean',
      columnType: 'tinyint(1)',
      defaultsTo: true,
    },
    bankAccounts: {
      collection: 'BankAccount',
      via: 'company'
    },
    user: {
      model: 'User'
    },
  },

};

