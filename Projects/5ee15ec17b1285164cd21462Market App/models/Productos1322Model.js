const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
  nameUser: {
    type: String,
    required: true
  },
  emailUser: {
    type: String,
    required: true
  }
})
const Productos1322 = mongoose.model("Productos1322", schema);
exports.Productos1322 = Productos1322;