const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");
const schema = new Schema({nameUser:{type:String,default:Erick,required:true},emailUser:{type:Number,required:true}})
const www = mongoose.model("www", schema);
function validate(www) {
  const schema = {nameUser:joi.string().required(),emailUser:joi.number().required()}
  return joi.validate(www, schema)
}
exports.www = www;
exports.validate = validate
  