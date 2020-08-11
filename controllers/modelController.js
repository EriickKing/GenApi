const {
  Model
} = require("../models/modelModel");
const modelController = {};
const func = require("../src/functions");
const mkdirp = require('mkdirp')
const fs = require('fs');
const modelExample = require("../BaseContent/modelsProject");
const controllerFile = require("../BaseContent/controllerRoute");
const perRoute = require("../BaseContent/FilePerRoute");
const RouterFile = require("../BaseContent/createRoutesFile");


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
      // func.Save(res, model);
      // CREACION DE MODELO
      func.CreateFile(
        `./Projects/${req.body.idUser}${req.body.titleProject}/models/${req.body.titleModel}Model.js`,
        modelExample.modelExample(req)
      )
      // CREACION DE CONTROLADOR
      // func.CreateFile(
      //   `./Projects/${req.body.idUser}${req.body.titleProject}/controllers/${req.body.titleModel}Controller.js`,
      //   controllerFile.controllerFile(req.body.titleModel)
      // )
      // CREACION ROUTE PER CONTROLLER
      // func.CreateFile(
      //   `./Projects/${req.body.idUser}${req.body.titleProject}/routes/${req.body.titleModel}Route.js`,
      //   perRoute.perRoute(req.body.titleModel)
      // )

      // RouterFile.RouterFile(req);

    }

  } catch (err) {

  }
}


modelController.getOneModel = async (req, res) => {
  let id = req.params.id
  let model = await Model.findById(id)

  if (model.length === 0) {
    res.status(404).json({
      success: false,
      message: "Model Not Found"
    })
  } else {
    res.status(200).json({
      success: true,
      data: model
    })
  }
}


module.exports = modelController;