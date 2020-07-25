const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/", auth, userController.createUser);
router.post("/login", userController.loginUser);

// router.post('/register', controllerModelo.crearModelo);



module.exports = router;