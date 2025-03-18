const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getSubscriptionPlans,
  subscribe,
  getSubscription,
  cancelSubscription,
  getSubscriptionHistory,
  updatePaymentStatus
} = require('../controllers/businessSubscriptionController');
const { protect, authorize } = require('../middleware/auth');

// Get subscription plans (public)
router.get('/plans', getSubscriptionPlans);

// Protected routes
router.use(protect);

// Business owner and admin only routes
router.use(authorize('business', 'admin'));

router.route('/')
  .get(getSubscription)
  .post(subscribe);

router.get('/history', getSubscriptionHistory);
router.post('/cancel', cancelSubscription);
router.patch('/payment/:paymentId', updatePaymentStatus);

module.exports = router;