var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  //   console.log("Backend is up.");
  return res.status(200).json({
    message: "Okay",
  });
});

module.exports = router;
