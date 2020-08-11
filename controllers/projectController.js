const {
  Project
} = require("../models/projectModel");
const projectController = {};
const func = require("../src/functions");
const mkdirp = require('mkdirp')
const fs = require('fs');

projectController.createProject = async (req, res) => {
  try {
    let project = new Project({
      titleProject: req.body.titleProject,
      dbUser: req.body.dbUser,
      dbPassword: req.body.dbPassword,
      dbUrl: req.body.dbUrl,
      dbName: req.body.dbName,
      idUser: req.body.idUser,
      descProject: req.body.descProject,
      createdAtProject: req.body.date
    })


    let exists = await Project.find({
      idUser: req.body.idUser,
      titleProject: req.body.titleProject
    })
    if (exists.length !== 0) {
      res.status(400).json({
        success: false,
        message: "The name is already in use."
      })
    } else {
      func.Save(res, project);
      mkdirp.sync(`./Projects/${req.body.idUser}${req.body.titleProject}`)
      mkdirp.sync(`./Projects/${req.body.idUser}${req.body.titleProject}/routes`)
      mkdirp.sync(`./Projects/${req.body.idUser}${req.body.titleProject}/src`)
      mkdirp.sync(`./Projects/${req.body.idUser}${req.body.titleProject}/controllers`)
      mkdirp.sync(`./Projects/${req.body.idUser}${req.body.titleProject}/models`)
      mkdirp.sync(`./Projects/${req.body.idUser}${req.body.titleProject}/config`)
      fs.writeFile(`./Projects/${req.body.idUser}${req.body.titleProject}/index.js`, func.content("./BaseContent/indexProject.js"), function (err) {
        if (err) throw err;
      })
      fs.writeFile(`./Projects/${req.body.idUser}${req.body.titleProject}/src/routes.js`,
        `\nmodule.exports = function (app) {\n};`,
        function (err) {
          if (err) throw err;
        })
      fs.writeFile(`./Projects/${req.body.idUser}${req.body.titleProject}/.env`, `DB_USER=${project.dbUrl}\nDB_PASSWORD=${project.dbPassword}\nDB_URL=${project.dbUrl}\nDB_NAME=${project.dbName}`, function (err) {
        if (err) throw err;
      })
      fs.writeFile(`./Projects/${req.body.idUser}${req.body.titleProject}/src/db.js`, func.content("./BaseContent/src-dbProject.js"), function (err) {
        if (err) throw err;
      })
      fs.writeFile(`./Projects/${req.body.idUser}${req.body.titleProject}/config/db_config.js`, func.content("./BaseContent/config-dbcfg.js"), function (err) {
        if (err) throw err;
      })
    }

  } catch (error) {
    return err
  }
}

projectController.getProjects = async (req, res) => {
  let project = await Project.find({
    idUser: req.body.idUser
  })

  if (project.length === 0) {
    res.status(404).json({
      success: false,
      message: "Projects Not Found"
    })
  } else {
    res.status(200).json({
      success: true,
      data: project
    })
  }

  // console.log(project);
}

projectController.getOneProject = async (req, res) => {
  let id = req.params.id
  let project = await Project.findById(id)

  if (project.length === 0) {
    res.status(404).json({
      success: false,
      message: "Project Not Found"
    })
  } else {
    res.status(200).json({
      success: true,
      data: project
    })
  }
}




module.exports = projectController;