module.exports = {

  friendlyName: 'Sign out',

  description: 'Exit from application',

  exits: {
    success: {
      responseType: 'ok',
      description: 'User sign out',
    },
  },

  fn: async function (inputs, exits) {

    this.req.session.salt = null;
    return exits.success();
  }

};
