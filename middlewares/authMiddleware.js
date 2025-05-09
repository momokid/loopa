const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // You can access user data in routes via req.user

    //Prevent caching of protected pages
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");

    next();
    
  } catch (err) {
    return res.redirect("/login");
  }
};

module.exports = authenticateToken;
