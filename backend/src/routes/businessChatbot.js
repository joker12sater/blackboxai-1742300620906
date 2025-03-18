const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  initializeChatbot,
  updateSettings,
  updateResponses,
  startConversation,
  sendMessage,
  getConversations,
  getAnalytics
} = require('../controllers/businessChatbotController');
const { protect, authorize } = require('../middleware/auth');

// Initialize or get chatbot (public)
router.get('/', initializeChatbot);

// Protected routes
router.use(protect);

// Routes for business owners and admins only
router.route('/settings')
  .put(authorize('business', 'admin'), updateSettings);

router.route('/responses')
  .put(authorize('business', 'admin'), updateResponses);

router.route('/analytics')
  .get(authorize('business', 'admin'), getAnalytics);

// Routes for authenticated users
router.post('/conversations', startConversation);
router.post('/conversations/:conversationId/messages', sendMessage);
router.get('/conversations', getConversations);

module.exports = router;