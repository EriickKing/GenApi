const mongoose = require("mongoose");
const {
  string
} = require("joi");
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
  dbUser: {
    type: String,
    required: true
  },
  dbPassword: {
    type: String,
    required: true
  },
  dbUrl: {
    type: String,
    required: true
  },
  dbName: {
    type: String,
    required: true
  },
  createdAtProject: {
    type: String
  },
  updatedAtProject: String,
  statusProject: {
    type: Number,
    default: 1
  }
});

const Project = mongoose.model("Project", projectSchema);

exports.Project = Project;