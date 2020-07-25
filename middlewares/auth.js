const jwt = require("jsonwebtoken");
const config = require("../config/dbcfg")

function verifyAuth(req, res, next) {
  const token = req.header("access-token");
  if (token) {
    try {
      const decoded = jwt.verify(token, config.secret);
      req.decoded = decoded;
      next();
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Denied Access"
      })
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid Token"
    })
  }
}


module.exports = verifyAuth;