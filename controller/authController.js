const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
// const { check, validationResult } = require("express-validator/check");
require("dotenv").config();

exports.signup = async (req, res, next) => {
  const { userName, email, password } = req.body;

  await User.findOne({ email: email })
    .then((existingEmail) => {
      if (existingEmail) {
        return res.status(200).json({
          message: "Email already Exists!!!",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err.message,
      });
    });

  //checking for existing email
  //   let existingEmail;
  //   try {
  //     existingEmail = await User.findOne({ email: email });
  //   } catch (err) {
  //     return res.status(500).json({
  //       error: err.message,
  //     });
  //   }
  //   if (existingEmail) {
  //     return res.status(200).json({
  //       message: "Email already Exists!!!",
  //     });
  //   }

  await User.findOne({ userName: userName })
    .then((existingUserName) => {
      if (existingUserName) {
        return res.status(200).json({
          message: "Username already Exists!!!",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err.message,
      });
    });

  //checking for existing username
  //   let existingUserName;
  //   try {
  //     existingUserName = await User.findOne({ userName: userName });
  //   } catch (err) {
  //     return res.status(500).json({
  //       error: err.message,
  //     });
  //   }
  //   if (existingUserName) {
  //     return res.status(200).json({
  //       message: "Username already Exists!!!",
  //     });
  //   }

  //hashing the password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).json({
      message: "Hashing failed!",
      error: err.message,
    });
  }

  //creating new user
  const user = { userName: userName, email: email, password: hashedPassword };

  try {
    User.create(user);
  } catch (err) {
    return res.status(500).json({
      message: "User NOT Created!!!",
      error: err.message,
    });
  }
  //signing using JWT
  let token;
  try {
    token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "48h",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Token not created!!!",
      error: err.message,
    });
  }

  return res.status(200).json({
    message: "User Created!!",
    userName: userName,
    email: email,
    token: token,
  });
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;

  //checking if username is valid
  let existingUserName;
  try {
    existingUserName = await User.findOne({ userName: userName });
  } catch (err) {
    return res.status(401).json({
      message: "Login Failed",
      error: err.message,
    });
  }

  if (!existingUserName) {
    return res.status(200).json({
      message: "Invalid Credentials!!!",
    });
  }

  //comparing passwords
  let verifyPassword;
  try {
    verifyPassword = await bcrypt.compare(password, existingUserName.password);
  } catch (err) {
    return res.status(401).json({
      message: "Login Failed",
      error: err.message,
    });
  }

  if (!verifyPassword) {
    return res.status(200).json({
      message: "Invalid Credentials!!!",
    });
  }

  const user = { userName: userName, email: existingUserName.email };
  //JWT token
  let token;
  try {
    token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "48h",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Token not created!!!",
      error: err.message,
    });
  }

  return res.status(200).json({
    message: "Login Successful!",
    token: token,
    id: existingUserName._id,
  });
};

//Validate Function
// exports.validate = [
//   check("userName").isLength({ min: 5 }),
//   check("email").isEmail(),
//   check("password").isLength({ min: 8 }),
//   (req, res, next) => {
//     //function for validating result from express validator
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     } else next();
//   },
// ];
