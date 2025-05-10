const express = require("express");
const router = express.Router();
const path = require("path");
const authenticateToken = require("../middlewares/authMiddleware");
const clearToken = require("../utils/clearToken");

//GET home page
router.get("/", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "dashboard.html"));
});

//GET signup page
router.get("/signup", (req, res) => {
  clearToken(res, req);
  res.sendFile(path.join(__dirname, "../public", "signup.html"));
});

//GET login page
router.get("/login", (req, res) => {
  clearToken(res, req);
  res.sendFile(path.join(__dirname, "../public", "login.html"));
});

router.get('/logout',(req, res)=>{
  clearToken(res, req);
  res.sendFile(path.join(__dirname, "../public", "login.html"));
})

module.exports = router;
