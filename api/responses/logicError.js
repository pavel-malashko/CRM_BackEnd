
module.exports = function logicError(optionalData) {

  let data = {
      code: 'E_LOGIC_ERROR',
      problems: [],
      message: 'A logic error produces unintended or undesired output or other behaviour, although it may not immediately be recognized as such'
  };

  if (_.isError(optionalData)) {
    data.message = optionalData.message;
  }

  if (typeof optionalData === 'string') {
    data.message = optionalData;
  }

  return this.res.status(409).json(data);
};
