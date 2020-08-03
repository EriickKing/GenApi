const express = require('express');
const router = express.Router();

const projectController = require("../controllers/projectController");

router.post("/", projectController.createProject);
router.post("/allbyuser", projectController.getProjects);
router.get("/one/:id", projectController.getOneProject);



module.exports = router;