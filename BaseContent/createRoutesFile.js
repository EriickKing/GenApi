var fs = require('fs');

function RouterFile(req) {
  var data = fs.readFileSync(`./Projects/${req.body.idUser}${req.body.titleProject}/src/routes.js`).toString().split("\n");
  data.splice(0, 0, `const ${req.body.titleModel} = require("../routes/${req.body.titleModel}Route")`)
  var find = (element) => element == "module.exports = function (app) {";
  var index = data.findIndex(find);
  data.splice(index + 1, 0, `app.use("/api/${req.body.titleModel}", ${req.body.titleModel})`);
  var text = data.join("\n");
  fs.writeFile(`./Projects/${req.body.idUser}${req.body.titleProject}/src/routes.js`, text, function (err) {
    if (err) return err;
  })
}

exports.RouterFile = RouterFile;