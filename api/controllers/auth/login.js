module.exports = {

  friendlyName: 'Sign in',
  description: 'User authentication',

  inputs: {
    email: {
      type: 'string',
      example: 'user@example.com',
      description: 'Users login',
      isEmail: true,
      required: true
    },
    password: {
      type: 'string',
      example: 'aS123456',
      minLength: 6,
      description: 'Account password',
      required: true
    }
  },

  exits: {
    success: {
      responseType: 'ok',
      description: 'User authenticated',
    },
    badCredentials: {
      responseType: 'authError',
      description: 'Bad password or login',
    }
  },

  fn: async function (inputs, exits) {

    let user = await User.findOne({ email: inputs.email });

    if (! user) throw 'badCredentials';

    if (AuthService.comparePasswords(inputs.password, user.password)) {

      let dynamicSalt = AuthService.generateSalt();
      let token = AuthService.generateToken(user.id, dynamicSalt);

      this.req.session.salt = dynamicSalt;

      return exits.success({
        user: user,
        token: token,
      });

    } else {
      return exits.badCredentials();
    }

  }

};
