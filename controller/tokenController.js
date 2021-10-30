const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.tokenController = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "Not Logged In" });
  }
  let token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return res.status(200).json({ message: "Authenticated" });
  } catch (err) {
    return res.status(403).json({ message: "Not Logged In" });
  }
};
