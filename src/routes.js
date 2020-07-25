const project = require("../routes/projectRoute");
const zip = require("../routes/fileRoute");
const user = require("../routes/userRoute");
const auth = require("../middlewares/auth");

module.exports = function (app) {

  app.use("/api/project", auth, project);
  app.use("/api/zip", zip);
  app.use("/api/user", user);

};