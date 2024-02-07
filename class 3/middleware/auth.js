//auth ,isStudent ,iaAdmin
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    //extract jwt tkken
    //Pending :other eay to token
    console.log("cookie", req.cookies.token);
    console.log("body", req.body.token);
    const token =
      req.body.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer", "");

    if (!token || token === undefined) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }
    //verify yhe token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);
      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something wrong while verify token",
    });
  }
};
exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "this is protected role for student",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user role not match",
    });
  }
};
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "this is protected role for admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user role not match",
    });
  }
};
