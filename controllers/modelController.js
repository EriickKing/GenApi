const {
  Model
} = require("../models/modelModel");
const modelController = {};
const func = require("../src/functions");
const mkdirp = require('mkdirp')
const fs = require('fs');
const modelExample = require("../BaseContent/modelsProject");

modelController.createModel = async (req, res) => {
  try {
    let model = new Model({
      titleModel: req.body.titleModel,
      keyModel: req.body.keyModel,
      typeModel: req.body.typeModel,
      idProject: req.body.idProject
    })

    let exists = await Model.find({
      idProject: req.body.idProject,
      titleModel: req.body.titleModel
    })
    // console.log(exists)
    if (exists.length !== 0) {
      res.status(400).json({
        success: false,
        message: "The name is already in use."
      })
    } else {
      func.Save(res, model);
      fs.writeFile(
        `./Projects/${req.body.idUser}${req.body.titleProject}/models/${req.body.titleModel}Model.js`,
        `const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(${JSON.stringify(modelExample.modelExample(req, res)).replace(/"/g,"")})
const ${req.body.titleModel} = mongoose.model("${req.body.titleModel}", schema);
exports.${req.body.titleModel} = ${req.body.titleModel};
        `,
        function (err) {
          if (err) throw err;
        })
    }

  } catch (err) {

  }
}


module.exports = modelController;