const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/history', authenticateToken, chatController.getChatHistory)

router.get('/users', authenticateToken, chatController.getActiveChatUsers)

router.get('/chat/:user1/:user2', authenticateToken, chatController.getUsersChatMessages)

module.exports = router

