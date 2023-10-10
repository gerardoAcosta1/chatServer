const {
  errorLogger,
  ormErrorHandler,
  errorHandler,
  notFoundErrorHandler,
  
} = require("../middelwares/errors.middleware")

const errorRoutes = (app) => {
  app.use(errorLogger);
  app.use(ormErrorHandler);
  app.use(errorHandler);
  app.use(notFoundErrorHandler);
};

module.exports = errorRoutes;
