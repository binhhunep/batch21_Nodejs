const Log = (req, res, next) => {
  console.log("Log");
  next();
};
module.exports = Log;
