//Basics
var express = require("express");
var app = express();
app.use(express.json());
// var cors = require("cors");
require("dotenv").config();

//Defined Variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

//Imports
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var mongoose = require("mongoose");

// app.use(cors());
//All Routes here
app.use("/", indexRouter);
app.use("/auth", authRouter);

//connecting Database
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the Database.......");
  })
  .catch((err) => {
    console.log(err);
  });
//Listening the requests
app.listen(PORT, () => console.log("Server is running..."));
module.exports = app;
