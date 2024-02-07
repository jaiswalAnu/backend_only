//import mongoose
const mongoose = require("mongoose");

//route handler

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, //reffernce to the post model
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Student", "Visitor"],
  },
});
module.exports = mongoose.model("user", userSchema);
