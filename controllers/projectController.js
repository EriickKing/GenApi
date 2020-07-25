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
      descProject: req.body.descProject,
      idUser: req.body.idUser,
      configProject: req.body.configProject
    })
    console.log(project.configProject[0].DB_USER);

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
    fs.writeFile(`./Projects/${req.body.idUser}${req.body.titleProject}/.env`, `DB_USER=${project.configProject[0].DB_USER}\nDB_PASSWORD=${project.configProject[1].DB_PASSWORD}\nDB_URL=${project.configProject[2].DB_URL}\nDB_NAME=${project.configProject[3].DB_NAME}`, function (err) {
      if (err) throw err;
    })
    fs.writeFile(`./Projects/${req.body.idUser}${req.body.titleProject}/src/db.js`, func.content("./BaseContent/src-dbProject.js"), function (err) {
      if (err) throw err;
    })
    fs.writeFile(`./Projects/${req.body.idUser}${req.body.titleProject}/config/db_config.js`, func.content("./BaseContent/config-dbcfg.js"), function (err) {
      if (err) throw err;
    })

  } catch (error) {
    return err
  }
}




module.exports = projectController;