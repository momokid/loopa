const express = require('express');
const router = express.Router();
const {registerUser, logoutUser, loginUser} = require('../controllers/authController')

router.post('/register', registerUser);

router.post('/logout',logoutUser);

router.post('/login',loginUser)


module.exports = router;