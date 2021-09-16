var express = require("express");
var router = express.Router();
var authController = require("../controller/authController");

//Routes
router.post("/login", authController.login);
router.post("/signup", authController.signup);

module.exports = router;
