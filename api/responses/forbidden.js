
module.exports = function forbidden(optionalData) {

  let data = {
    code: 'E_FORBIDDEN',
    problems: [],
    message: 'Forbidden'
  };

  if (_.isError(optionalData)) {
    data.message = optionalData.message;
  }

  if (typeof optionalData === 'string') {
    data.message = optionalData;
  }

  if (typeof optionalData === 'object') {
    data.code = optionalData.code || data.code;
    data.message = optionalData.message || data.message;
  }

  return this.res.status(403).json(data);
};
