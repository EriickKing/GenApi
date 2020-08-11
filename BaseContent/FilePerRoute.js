function perRoute(fileName) {
  var file = `const express = require('express');
const router = express.Router();
const ${fileName}Controller = require("../controllers/${fileName}Controller");


module.exports = router;
  `
  return file
}


exports.perRoute = perRoute;
