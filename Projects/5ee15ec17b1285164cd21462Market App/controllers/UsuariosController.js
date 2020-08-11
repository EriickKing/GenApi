const {
  Usuarios
} = require("../models/UsuariosModel");
const UsuariosController = {};

UsuariosController.apinueva = async (req, res) => {
  try {
    let usuarios = new Usuarios({
      nameUser: req.body.nameUser,
      emailUser: req.body.emailUser
    })
    const saved = await Usuarios.save();
    if (saved) return res.status(200).json({
      success: true,
      message: usuarios
    });
  } catch (err) {
    throw err
  }
}

module.exports = UsuariosController;