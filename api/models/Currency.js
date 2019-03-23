/**
 * DocumentType.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'currency',

  attributes: {
    name: {
      type: 'string',
      columnType: 'char(3)',
      required: true,
      minLength: 3,
      maxLength: 3
    },
    transactions: {
      collection: 'Transaction',
      via: 'currency'
    },
    documents: {
      collection: 'Document',
      via: 'currency'
    },
    createdAt: false,
    updatedAt: false,
  },

};

