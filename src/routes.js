const project = require("../routes/projectRoute");
const zip = require("../routes/fileRoute");
const user = require("../routes/userRoute");
const auth = require("../middlewares/auth");
const model = require("../routes/modelRoute");
const api = require("../routes/apiRoute");

module.exports = function (app) {
  app.use("/api/project",  project);
  app.use("/api/zip", zip);
  app.use("/api/user", user);
  app.use("/api/model", model)
  app.use("/api/api", api)

};