/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'user',

  attributes: {
    name: {
      type: 'string',
      columnType: 'varchar(50)',
      required: true,
      maxLength: 50
    },
    email: {
      type: 'string',
      columnType: 'varchar(255)',
      required: true,
      isEmail: true,
      maxLength: 255
    },
    password: {
      type: 'string',
      columnType: 'varchar(255)',
      required: true,
      maxLength: 255
    },
  },

  customToJSON: function() {
    return _.omit(this, 'password');
  }

};

