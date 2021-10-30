var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var defectController = require("../controller/defectController");

router.post("/add", defectController.add);

module.exports = router;
