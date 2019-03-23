
module.exports = function notAuthorized(optionalData) {

  let data = {
    code: 'E_NOT_AUTHORIZED',
    problems: [],
    message: '401 Not authorized'
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

  return this.res.status(401).json(data);
};
