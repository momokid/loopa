const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Handle user signup
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  try {
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    //Check if username exists
    if (userCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //insert new user
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    const user = newUser.rows[0];

    //generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    //set token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//User logout
const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

//User loging

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    //check if user exists
    const userQuery = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );
    const user = userQuery.rows[0];

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    //Compare password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide correct credentials",
        });
    }

    //Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    //Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (err) {
    return res.status(500).json({ message: "Server error!" });
  }
};

module.exports = {
  registerUser,
  logoutUser,
  loginUser,
};
