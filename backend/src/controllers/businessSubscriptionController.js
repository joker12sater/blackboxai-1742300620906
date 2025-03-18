const BusinessSubscription = require('../models/BusinessSubscription');
const Business = require('../models/Business');

// Get subscription plans
exports.getSubscriptionPlans = async (req, res) => {
  try {
    const plans = {
      free: {
        name: 'Free',
        price: 0,
        duration: 'Unlimited',
        features: [
          { name: 'Basic Business Listing', description: 'List your business with basic information' },
          { name: 'Basic Analytics', description: 'View basic visitor statistics' },
          { name: 'Customer Reviews', description: 'Receive and manage customer reviews' }
        ]
      },
      basic: {
        name: 'Basic',
        price: 999,
        duration: '30 days',
        features: [
          { name: 'Enhanced Business Listing', description: 'Premium business listing with photos' },
          { name: 'Advanced Analytics', description: 'Detailed visitor and engagement analytics' },
          { name: 'Priority Support', description: '24/7 customer support' },
          { name: 'Business Chat', description: 'Chat with customers in real-time' }
        ]
      },
      premium: {
        name: 'Premium',
        price: 2999,
        duration: '30 days',
        features: [
          { name: 'Featured Listing', description: 'Top placement in search results' },
          { name: 'Complete Analytics Suite', description: 'Full analytics with customer insights' },
          { name: 'Priority Support Plus', description: 'Dedicated account manager' },
          { name: 'Advanced Business Chat', description: 'AI-powered chatbot integration' },
          { name: 'Marketing Tools', description: 'Email marketing and promotional tools' }
        ]
      }
    };

    res.json({
      success: true,
      data: plans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Subscribe to a plan
exports.subscribe = async (req, res) => {
  try {
    const { plan } = req.body;
    const businessId = req.params.businessId;

    // Check if business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Check if user is authorized
    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to manage subscriptions for this business'
      });
    }

    // Check if there's an active subscription
    const activeSubscription = await BusinessSubscription.findOne({
      business: businessId,
      status: 'active'
    });

    if (activeSubscription) {
      return res.status(400).json({
        success: false,
        message: 'Business already has an active subscription'
      });
    }

    // Set subscription details based on plan
    const planDetails = {
      free: { price: 0, duration: 365 }, // 1 year for free plan
      basic: { price: 999, duration: 1 }, // 1 month
      premium: { price: 2999, duration: 1 } // 1 month
    };

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + planDetails[plan].duration);

    // Create new subscription
    const subscription = await BusinessSubscription.create({
      business: businessId,
      plan,
      price: planDetails[plan].price,
      startDate,
      endDate,
      features: req.body.features || []
    });

    // Update business subscription status
    business.subscription = {
      plan,
      startDate,
      endDate,
      status: 'active'
    };
    await business.save();

    res.status(201).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get business subscription
exports.getSubscription = async (req, res) => {
  try {
    const subscription = await BusinessSubscription.findOne({
      business: req.params.businessId,
      status: 'active'
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found'
      });
    }

    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Cancel subscription
exports.cancelSubscription = async (req, res) => {
  try {
    const subscription = await BusinessSubscription.findOne({
      business: req.params.businessId,
      status: 'active'
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found'
      });
    }

    // Check if user is authorized
    const business = await Business.findById(req.params.businessId);
    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to manage subscriptions for this business'
      });
    }

    await subscription.cancel(req.body.reason);

    // Update business subscription status
    business.subscription.status = 'cancelled';
    await business.save();

    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get subscription history
exports.getSubscriptionHistory = async (req, res) => {
  try {
    const subscriptions = await BusinessSubscription.find({
      business: req.params.businessId
    }).sort('-createdAt');

    res.json({
      success: true,
      count: subscriptions.length,
      data: subscriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update subscription payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId, status } = req.body;
    const subscription = await BusinessSubscription.findOne({
      business: req.params.businessId,
      'paymentHistory._id': paymentId
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription or payment not found'
      });
    }

    const payment = subscription.paymentHistory.id(paymentId);
    payment.status = status;
    await subscription.save();

    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};