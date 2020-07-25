var JSZip = require('jszip');
const func = require("../src/functions");
var fs = require('fs');
const zipFolder = require('zip-a-folder');

const filesController = {};

filesController.createZip = async (req, res) => {
  res.setHeader('Content-Type', 'application/zip');
  res.set('Content-Disposition', 'attachment; filename=GENAPI.zip');

  await zipFolder.zip('./Projects/5ee15ec17b1285164cd21462Proyecto 2', './ProjectsZIP/5ee15ec17b1285164cd21462Proyecto 2.zip');
  await res.download("./ProjectsZIP/5ee15ec17b1285164cd21462Proyecto 2.zip")






  // DOWNLOAD IT
  // zip.generateAsync({
  //     type: 'nodebuffer'
  //   })
  //   .then(function (content) {
  //     res.send(content)
  //   }.bind(res));
}


module.exports = filesController;