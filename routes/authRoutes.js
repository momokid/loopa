const express = require('express');
const router = express.Router();
const {registerUser, logoutUser, loginUser} = require('../controllers/authController')
const authenticateToken = require('../middlewares/authMiddleware');
const { getCurrentUser } = require('../controllers/chatController');


router.post('/register', registerUser);

router.post('/logout',logoutUser);

router.post('/login',loginUser)

// router.get('/me',authenticateToken, getCurrentUser)


module.exports = router;