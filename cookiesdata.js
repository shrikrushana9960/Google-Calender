const googleUtil = require("./google-utils");
const setCookie = async (req, res, next) => {
  req.session = {};
  googleUtil.getGoogleAccountFromCode(req.query.code, (err, res) => {
    if (err) {
      res.redirect("/login");
    } else {
      req.session.user = res;
    }
    next();
  });
};

module.exports = { setCookie };
