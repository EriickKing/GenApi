const express = require('express');
const router = express.Router();

const modelController = require("../controllers/modelController");

// router.post('/register', controllerModelo.crearModelo);
router.post("/", modelController.createModel);
router.get("/one/:id", modelController.getOneModel);

module.exports = router;