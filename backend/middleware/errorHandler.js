export function errorHandler(error, req, res, next) {
  const isDuplicateKey = error.code === 11000;
  const isMongooseValidationError = error.name === 'ValidationError';
  const statusCode = isDuplicateKey
    ? 409
    : isMongooseValidationError
      ? 422
      : error.statusCode || error.status || 500;
  const message = isDuplicateKey
    ? 'A record with this value already exists.'
    : isMongooseValidationError
      ? Object.values(error.errors)
          .map((validationError) => validationError.message)
          .join(' ')
      : error.message || 'An unexpected server error occurred.';
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(error.details ? { errors: error.details } : {}),
    ...(isProduction ? {} : { stack: error.stack }),
  });
}
