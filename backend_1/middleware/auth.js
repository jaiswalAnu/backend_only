// middleware/auth.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your-secret-key";

function authenticate(req, res, next) {
  // Check if the token is present in cookies
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    // Attach the user ID to the request for further processing
    req.userId = decodedToken.userId;
    next();
  });
}

module.exports = authenticate;
