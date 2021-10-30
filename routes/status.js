var express = require("express");
var router = express.Router();
var statusController = require("../controller/statusController");

//Routes
router.get("/", statusController.get);

module.exports = router;
