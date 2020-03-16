const project = require("../routes/projectRoute");

module.exports = function(app) {

  app.use("/api/project", project);

};