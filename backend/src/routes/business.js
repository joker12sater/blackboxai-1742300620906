const express = require('express');
const router = express.Router();
const {
  createBusiness,
  getBusinesses,
  getBusiness,
  updateBusiness,
  deleteBusiness,
  addReview
} = require('../controllers/businessController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getBusinesses);
router.get('/:id', getBusiness);

// Protected routes
router.post('/', protect, createBusiness);
router.put('/:id', protect, authorize('business', 'admin'), updateBusiness);
router.delete('/:id', protect, authorize('business', 'admin'), deleteBusiness);
router.post('/:id/reviews', protect, addReview);

// Business subscription routes
router.use('/:businessId/subscriptions', require('./businessSubscriptions'));

// Business chatbot routes
router.use('/:businessId/chatbot', require('./businessChatbot'));

// Business reviews routes
router.use('/:businessId/reviews', require('./businessReviews'));

// Business location routes
router.use('/:businessId/location', require('./businessLocation'));

module.exports = router;