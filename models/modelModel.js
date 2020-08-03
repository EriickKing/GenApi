const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  titleModel: {
    type: String,
    required: true,
    unique: true
  },
  keyModel: {
    type: Array,
    required: true
  },
  typeModel: {
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
  updatedAtModel: String,
  statusModel: {
    type: Number,
    default: 1
  }
});

const Model = mongoose.model("Model", modelSchema);

exports.Model = Model;