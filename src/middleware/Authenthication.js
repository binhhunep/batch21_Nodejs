const Authenthication = (req, res, next) => {
  console.log("Authorization");
  next();
};
module.exports = Authenthication;
