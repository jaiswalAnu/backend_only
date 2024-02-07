const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middleware/auth");

router.post("/login", login);
router.post("/signup", signup);
//protected route
router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for test",
  });
});
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for Student",
  });
});
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for Student",
  });
});
module.exports = router;
