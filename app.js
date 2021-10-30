//Basics
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

var jwt = require("jsonwebtoken");
var express = require("express");
var app = express();
app.use(cors(corsOptions));
app.use(express.json());
// var cors = require("cors");
require("dotenv").config();

//Defined Variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

//Imports
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var tokenRouter = require("./routes/token");
var inventoryRouter = require("./routes/inventory");
var statusRouter = require("./routes/status");
var defectsRouter = require("./routes/defect");
var transactionsRouter = require("./routes/transaction");
var mongoose = require("mongoose");

// app.use(cors());
//All Routes here
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/checkToken", tokenRouter);
app.use("/inventory", inventoryRouter);
app.use("/status", statusRouter);
app.use("/defect", defectsRouter);
app.use("/transaction", transactionsRouter);

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
