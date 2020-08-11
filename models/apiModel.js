const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apiSchema = new Schema({
  nameApi: {
    type: String,
    required: true
  },
  idenApi: {
    type: String,
    required: true
  },
  idProject: {
    type: String,
    required: true
  },
  idModel: {
    type: String,
    required: true
  },
  methodApi: {
    type: String,
    required: true
  },
  paramsApi: {
    type: Array
  },
  createdAtApi: {
    type: String
  },
  updatedAtApi: {
    type: String
  },
  statusApi: {
    type: Number,
    default: 1
  }
});

const Api = mongoose.model("Api", apiSchema);

exports.Api = Api;