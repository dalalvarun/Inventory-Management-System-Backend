var express = require("express");
var router = express.Router();
var inventoryController = require("../controller/inventoryController");

//Routes
router.post("/add", inventoryController.add);
router.get("/get", inventoryController.get);
router.post("/getByID", inventoryController.getByID);
// router.post("/signup", authController.signup);

module.exports = router;
