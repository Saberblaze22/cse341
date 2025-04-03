const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    // username must be an email
    body('username').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

app.use(function handleNotFoundError(error, req, res, next) {
    if (error instanceof NotFoundError) {
      return res.status(HttpStatus.NOT_FOUND).send({
        httpStatus: HttpStatus.NOT_FOUND,
        message: error.message,
        error: {}
      });
    }
    next(error);
  });
  
  app.use(function handlePublicBookmarkExistingError(error, req, res, next) {
    if (error instanceof PublicBookmarkExistingError) {
      return res.status(HttpStatus.CONFLICT).send({
        httpStatus: HttpStatus.CONFLICT,
        message: error.message,
        error: {}
      });
    }
    next(error);
  });
  
  app.use(function handleUserIdValidationError(error, req, res, next) {
    if (error instanceof UseridTokenValidationError) {
      res.status(HttpStatus.UNAUTHORIZED);
      return res.send({
        httpStatus: HttpStatus.UNAUTHORIZED,
        message: error.message
      });
    }
    next(error);
  });
  
  app.use(function handleValidationError(error, request, response, next) {
    if (error instanceof ValidationError) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({
          httpStatus: HttpStatus.BAD_REQUEST,
          message: error.message,
          validationErrors: error.validationErrors
        });
    }
    next(error);
  });
  
  app.use(function handleDatabaseError(error, request, response, next) {
    if (error instanceof MongoError) {
      if (error.code === 11000) {
        return response
          .status(HttpStatus.CONFLICT)
          .json({
            httpStatus: HttpStatus.CONFLICT,
            type: 'MongoError',
            message: error.message
          });
      } else {
        return response.status(503).json({
          httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
          type: 'MongoError',
          message: error.message
        });
      }
    }
    next(error);
  });
  
  // production error handler
  // no stacktraces leaked to user
  app.use(function (error, req, res, next) {
    if (res.headersSent) {
      return next(error)
    } else {
      res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({
        message: error.message,
        error: {}
      });
    }
  
  });

module.exports = {
  userValidationRules,
  validate,
}