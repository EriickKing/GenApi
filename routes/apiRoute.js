const express = require('express');
const router = express.Router();

const apiController = require("../controllers/apiController");

router.post("/post", apiController.createPOST);
router.post("/get", apiController.createGET);


module.exports = router;