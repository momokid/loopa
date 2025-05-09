const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/history', chatController.getChatHistory)

router.get('/users', authenticateToken, chatController.getActiveChatUsers)
module.exports = router

