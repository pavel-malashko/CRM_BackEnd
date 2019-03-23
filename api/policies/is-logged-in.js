module.exports = async function (req, res, proceed) {

  if (sails.config.environment == 'development'){

    sails.log.info(req.method, req.url);
    req.user = await User.findOne({ id: 1 });
    return proceed();

  }

  if (req.headers.authorization && req.session.salt) {

    let userId = AuthService.checkToken(req.headers.authorization, req.session.salt);
    console.log(userId);

    if (userId) {
      req.user = await User.findOne({ id: userId });
      return proceed();
    }

  }

  return res.notAuthorized();

};
