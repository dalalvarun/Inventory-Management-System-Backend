var express = require("express");
var router = express.Router();
var transactionsController = require("../controller/transactionsController");

router.post("/add", transactionsController.add);
router.get("/all", transactionsController.all);
router.post("/return", transactionsController.return);

module.exports = router;
