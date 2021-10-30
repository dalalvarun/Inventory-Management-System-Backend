var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var tk = require("../controller/tokenController");

router.post("/", tk.tokenController);

module.exports = router;
