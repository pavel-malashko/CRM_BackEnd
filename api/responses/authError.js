module.exports = function authError(optionalData) {

  let data = {
    code: 'E_BAD_CREDENTIALS',
    problems: [],
    message: 'Bad password or login'
  };

  if (_.isError(optionalData)) {
    data.message = optionalData.message;
  }

  if (typeof optionalData === 'string') {
    data.message = optionalData;
  }

  return this.res.status(400).json(data);
};
