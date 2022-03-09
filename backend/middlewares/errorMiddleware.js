'use strict';
const HTTPError = require('../utils/httpError');

const handleValidationError = (error) => {
  const errors = Object.keys(error.errors).map((key) => `${error.errors[key].message}`);
  return new HTTPError(400, errors.join('; '));
};

const handleDuplicateKeyError = (error) => {
  return new HTTPError(400, 'Email already exists');
};

const handleJWTErrot = (error) => {
  return new HTTPError(401, 'Log in to access this resource');
};

const errorHandler = (error, req, res, next) => {
  console.log(error);
  let errorCopy = { ...error, message: error.message };
  if (errorCopy.name === 'ValidationError') errorCopy = handleValidationError(errorCopy);
  if (errorCopy.code === 11000) errorCopy = handleDuplicateKeyError(errorCopy);
  if (errorCopy.name === 'JsonWebTokenError' || errorCopy.name === 'TokenExpiredError')
    errorCopy = handleJWTErrot(errorCopy);

  const httpCode = errorCopy.httpCode || 500;
  const message = `${httpCode}`.startsWith('4') ? errorCopy.message : 'Internal Server Error';
  res.status(httpCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
