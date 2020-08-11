const Usuarios = require("../routes/UsuariosRoute")

module.exports = function (app) {
app.use("/api/Usuarios", Usuarios)

};