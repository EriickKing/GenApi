const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");
const schema = new Schema({nameUser:{type:String,default:Erick},emailUser:{type:Number,required:true}})
const das = mongoose.model("das", schema);
function validate(das) {
  const schema = {nameUser:joi.string(),emailUser:joi.number().required()}
  return joi.validate(das, schema)
}
exports.das = das;
exports.validate = validate
  