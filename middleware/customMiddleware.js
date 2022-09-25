function logger(req, res, next) {
  console.log("Logging middleware...");
  next();
}

module.exports = logger;
