function modelExample(req) {
  var json = {};
  var jsonJoi = {};
  for (let index = 0; index < req.body.keyModel.length; index++) {
    json[req.body.keyModel[index]] = req.body.typeModel[index]
    if (req.body.typeModel[index].required == undefined) {
      jsonJoi[req.body.keyModel[index]] = "joi." + req.body.typeModel[index].type.toLowerCase() + "()"
    } else {
      jsonJoi[req.body.keyModel[index]] = "joi." + req.body.typeModel[index].type.toLowerCase() + "().required()"

    }
  }
  // console.log(json);
  var file = `const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");
const schema = new Schema(${JSON.stringify(json).replace(/"/g,"")})
const ${req.body.titleModel} = mongoose.model("${req.body.titleModel}", schema);
function validate(${req.body.titleModel.toLowerCase()}) {
  const schema = ${JSON.stringify(jsonJoi).replace(/"/g,"")}
  return joi.validate(${req.body.titleModel.toLowerCase()}, schema)
}
exports.${req.body.titleModel} = ${req.body.titleModel};
exports.validate = validate
  `
  // console.log(file);
  return file;
}

exports.modelExample = modelExample;