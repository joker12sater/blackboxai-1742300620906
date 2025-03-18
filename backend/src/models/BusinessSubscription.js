const mongoose = require('mongoose');

const businessSubscriptionSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  plan: {
    type: String,
    enum: ['free', 'basic', 'premium'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  features: [{
    name: String,
    description: String,
    isEnabled: {
      type: Boolean,
      default: true
    }
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active'
  },
  paymentHistory: [{
    amount: Number,
    paymentDate: Date,
    paymentMethod: String,
    transactionId: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  }],
  autoRenew: {
    type: Boolean,
    default: true
  },
  cancellationReason: String,
  cancellationDate: Date
}, {
  timestamps: true
});

// Add index for efficient queries
businessSubscriptionSchema.index({ business: 1, status: 1 });

// Virtual field for remaining days
businessSubscriptionSchema.virtual('remainingDays').get(function() {
  if (this.status !== 'active') return 0;
  const now = new Date();
  const end = new Date(this.endDate);
  const diffTime = Math.abs(end - now);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Pre-save middleware to check subscription status
businessSubscriptionSchema.pre('save', function(next) {
  const now = new Date();
  if (now > this.endDate && this.status === 'active') {
    this.status = 'expired';
  }
  next();
});

// Method to check if subscription is active
businessSubscriptionSchema.methods.isActive = function() {
  return this.status === 'active' && new Date() <= this.endDate;
};

// Method to renew subscription
businessSubscriptionSchema.methods.renew = async function(duration) {
  const now = new Date();
  this.startDate = now;
  this.endDate = new Date(now.setMonth(now.getMonth() + duration));
  this.status = 'active';
  await this.save();
  return this;
};

// Method to cancel subscription
businessSubscriptionSchema.methods.cancel = async function(reason) {
  this.status = 'cancelled';
  this.cancellationReason = reason;
  this.cancellationDate = new Date();
  this.autoRenew = false;
  await this.save();
  return this;
};

const BusinessSubscription = mongoose.model('BusinessSubscription', businessSubscriptionSchema);

module.exports = BusinessSubscription;