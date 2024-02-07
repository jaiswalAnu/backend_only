const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

////signup route handler
exports.signup = async (req, res) => {
  try {
    //get data
    const { name, email, password, role } = req.body;
    //check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Exists",
      });
    }
    //secure password
    let hashedpassword;
    try {
      hashedpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hasheding password",
      });
    }
    //create entry for User
    const user = await User.create({
      name,
      email,
      password: hashedpassword,
      role,
    });
    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User connot be registerd ,please try again later",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    //datafech
    const { email, password } = req.body;
    //validation on email and passwrd
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill al the detail carefully",
      });
    }
    //check for register user
    let user = await User.findOne({ email });
    //  if not a registrt user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registed",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    //verify password & generated a jwt token
    if (await bcrypt.compare(password, user.password)) {
      //password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      // console.log(user);
      user = user.toObject();
      user.token = token;
      user.password = undefined;
      const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("babbarCookie", token, option).status(200).json({
        success: true,
        token,
        user,
        message: "user logged successfully",
      });
    } else {
      //paasward do not match
      return res.status(403).json({
        success: false,
        message: "password incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      message: "Login Failure",
    });
  }
};
