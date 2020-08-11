const {
  Api
} = require("../models/apiModel");
const {
  Model
} = require("../models/modelModel");
const {
  Project
} = require("../models/projectModel");
const func = require("../src/functions");
const apiController = {};
var fs = require('fs');

apiController.createPOST = async (req, res) => {
  try {
    let api = new Api({
      nameApi: req.body.nameApi,
      idenApi: req.body.idenApi,
      idProject: req.body.idProject,
      idModel: req.body.idModel,
      methodApi: req.body.methodApi,
      paramsApi: req.body.paramsApi
    })

    let project = await Project.findById(api.idProject);

    let model = await Model.findById(api.idModel);


    var data = fs.readFileSync(`./Projects/${project.idUser}${project.titleProject}/controllers/${model.titleModel}Controller.js`)
      .toString().split("\n");
    var find = (element) => element == `const ${model.titleModel}Controller = {};`;
    var index = data.findIndex(find);
    var json = {};

    for (let index = 0; index < model.keyModel.length; index++) {
      json[model.keyModel[index]] = "req.body." + model.keyModel[index]
    }
    let apiFile = `${model.titleModel}Controller.${api.nameApi} = async (req, res) => {
  try {
    let ${model.titleModel.toLowerCase()} = new ${model.titleModel}(${JSON.stringify(json).replace(/"/g,"")})
    const saved = await ${model.titleModel}.save();
    if (saved) return res.status(200).json({
      success: true,
      ${model.titleModel.toLowerCase()}
    });
  } catch (err) {
    throw err
  }
}

`

    data.splice(index + 2, 0, apiFile);
    var text = data.join("\n");
    fs.writeFile(`./Projects/${project.idUser}${project.titleProject}/controllers/${model.titleModel}Controller.js`, text, function (err) {
      if (err) return err;
    })
    dirRoute(project,model, api);

  } catch (err) {
    console.log(err);
  }
}

apiController.createGET = async (req, res) => {
  try {
    let api = new Api({
      nameApi: req.body.nameApi,
      idenApi: req.body.idenApi,
      idProject: req.body.idProject,
      idModel: req.body.idModel,
      methodApi: req.body.methodApi,
      paramsApi: req.body.paramsApi
    })

    let project = await Project.findById(api.idProject);

    let model = await Model.findById(api.idModel);

    var data = fs.readFileSync(`./Projects/${project.idUser}${project.titleProject}/controllers/${model.titleModel}Controller.js`)
      .toString().split("\n");
    var find = (element) => element == `const ${model.titleModel}Controller = {};`;
    var index = data.findIndex(find);
    var json = {};
    if (api.paramsApi.length !== 0) {
      for (let index = 0; index < api.paramsApi.length; index++) {
        json[api.paramsApi[index]] = "req.params." + api.paramsApi[index]
      }
    }

    let apiFile = `${model.titleModel}Controller.${api.nameApi} = async (req, res) => {
      try {
        let ${model.titleModel.toLowerCase()} = await ${model.titleModel}.find(${JSON.stringify(json).replace(/"/g,"")})

        if (${model.titleModel.toLowerCase()}.length === 0) {
          res.status(404).json({
            success: false,
            message: "Not Found"
          })
        } else {
          res.status(200).json({
            success: true,
            data: ${model.titleModel.toLowerCase()}
          })
        }
      } catch (err) {
        throw err
      } 
    }

    `

    data.splice(index + 2, 0, apiFile);
    var text = data.join("\n");
    fs.writeFile(`./Projects/${project.idUser}${project.titleProject}/controllers/${model.titleModel}Controller.js`, text, function (err) {
      if (err) return err;
    })
    
    dirRoute(project,model, api);


  } catch (error) {

  }
}

function dirRoute(project, model, api) {
  var data = fs.readFileSync(`./Projects/${project.idUser}${project.titleProject}/routes/${model.titleModel}Route.js`).toString().split("\n");

  var find = (element) => element == `const ${model.titleModel}Controller = require("../controllers/${model.titleModel}Controller");`;
  var index = data.findIndex(find);

  let apiFile = `router.${api.methodApi}("${api.idenApi}", ${model.titleModel}Controller.${api.nameApi});`;

  data.splice(index + 2, 0, apiFile);
  var text = data.join("\n");

  fs.writeFile(`./Projects/${project.idUser}${project.titleProject}/routes/${model.titleModel}Route.js`, text, function (err) {
    if (err) return err;
  })


}


module.exports = apiController;