const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
  descLog: {
    type: String,
    required: true
  },
  idUser: {
   type: Array,
   required: true
  },
  idProject: {
    type: String,
    required: true
  },
  createdAtModel: {
    type: String
  },
  statusLog: {
    type: Number,
    default: 1
  }
});

const Log = mongoose.model("Log", logSchema);

exports.Log = Log;