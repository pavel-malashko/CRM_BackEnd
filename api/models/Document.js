/**
 * Document.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const appliedExtensions = ['application/pdf','image/png'];

module.exports = {

  tableName: 'document',

  attributes: {
    file: {
      type: 'string',
      columnType: 'varchar(255)',
      required: true,
      maxLength: 255
    },
    date: {
      type: 'number',
      columnType: 'bigint',
      required: true
    },
    number: {
      type: 'string',
      columnType: 'varchar(30)',
      required: true,
      maxLength: 30
    },
    amount: {
      type: 'number',
      columnType: 'double',
    },
    comment: {
      type: 'string',
      columnType: 'varchar(500)',
      maxLength: 500
    },
    transactions: {
      collection: 'Transaction',
      via: 'documents'
    },
    currency: {
      model: 'Currency'
    },
    contractor: {
      model: 'Company'
    },
    customer: {
      model: 'Company'
    },
    user: {
      model:'User'
    },
    type: {
      model: 'DocumentType'
    },
  },

  appliedExtensions: appliedExtensions,

  customToJSON: function () {
    if (this.file) this.file = sails.config.storage.url + this.file;
    return this;
  }

};

