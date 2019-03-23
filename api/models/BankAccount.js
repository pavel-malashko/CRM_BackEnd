/**
 * BankAccount.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'bank_account',

  attributes: {
    iban: {
      type: 'string',
      columnType: 'varchar(60)',
      required: true,
      maxLength: 60
    },
    code: {
      type: 'string',
      columnType: 'varchar(60)',
      required: true,
      maxLength: 60
    },
    codeType: {
      type: 'string',
      columnType: 'enum("BIC","CODE","SWIFT")',
      isIn: ['BIC', 'CODE', 'SWIFT'],
      required: true,
    },
    bankName: {
      type: 'string',
      columnType: 'varchar(255)',
      required: true,
      maxLength: 255
    },
    comment: {
      type: 'string',
      columnType: 'varchar(500)',
      maxLength: 500
    },
    company: {
      model: 'Company'
    },
    user: {
      model: 'User'
    },
  },

  codeTypes: () => {
    return ['BIC', 'CODE', 'SWIFT'];
  }

};

