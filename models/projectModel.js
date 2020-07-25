const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  titleProject: {
    type: String,
    required: true
  },
  descProject: {
    type: String,
    required: true
  },
  idUser: {
    type: String,
    required: true
  },
  configProject: [],
  createdAtProject: {
    type: Date,
    default: new Date(Date.now())
  },
  updatedAtProject: String,
  statusProject: {
    type: Number,
    default: 1
  }
});

const Project = mongoose.model("Project", projectSchema);

exports.Project = Project;