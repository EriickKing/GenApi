const express = require('express');
const router = express.Router();

const filesController = require("../controllers/filesController");

// router.post('/register', controllerModelo.crearModelo);
router.get("/", filesController.createZip);


module.exports = router;