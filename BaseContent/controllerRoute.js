function controllerFile(fileName) {
  var file = `const {${fileName}, validate} = require("../models/${fileName}Model");
const ${fileName}Controller = {};


module.exports = ${fileName}Controller;
  `
  return file
}

exports.controllerFile = controllerFile;