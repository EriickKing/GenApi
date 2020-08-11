const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");
const schema = new Schema({nameUser:{type:Number,required:true},emailUser:{type:Number,required:true}})
const Proyecto = mongoose.model("Proyecto", schema);
function validate(proyecto) {
  const schema = {nameUser:joi.string(),emailUser:joi.number().required()}
  return joi.validate(proyecto, schema)
}
exports.Proyecto = Proyecto;
exports.validate = validate
  