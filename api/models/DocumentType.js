/**
 * DocumentType.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'document_type',

  attributes: {
    name: {
      type: 'string',
      columnType: 'varchar(60)',
      required: true,
      maxLength: 60
    },
    documents: {
      collection:'Document',
      via:'type'
    },
    createdAt: false,
    updatedAt: false,
  },

};

