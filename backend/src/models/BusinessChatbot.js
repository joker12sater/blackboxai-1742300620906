const mongoose = require('mongoose');

const businessChatbotSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  settings: {
    welcomeMessage: {
      type: String,
      default: 'Welcome! How can I assist you today?'
    },
    offlineMessage: {
      type: String,
      default: 'We are currently offline. Please leave a message and we will get back to you.'
    },
    operatingHours: {
      start: {
        type: String,
        default: '09:00'
      },
      end: {
        type: String,
        default: '17:00'
      },
      timezone: {
        type: String,
        default: 'UTC'
      }
    },
    autoReply: {
      type: Boolean,
      default: true
    }
  },
  responses: [{
    trigger: {
      type: String,
      required: true
    },
    response: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  conversations: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    messages: [{
      sender: {
        type: String,
        enum: ['user', 'bot', 'business'],
        required: true
      },
      content: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      },
      read: {
        type: Boolean,
        default: false
      }
    }],
    status: {
      type: String,
      enum: ['active', 'resolved', 'archived'],
      default: 'active'
    },
    startedAt: {
      type: Date,
      default: Date.now
    },
    lastMessageAt: Date,
    resolvedAt: Date
  }],
  analytics: {
    totalConversations: {
      type: Number,
      default: 0
    },
    averageResponseTime: {
      type: Number,
      default: 0
    },
    resolutionRate: {
      type: Number,
      default: 0
    },
    popularQueries: [{
      query: String,
      count: Number
    }]
  }
}, {
  timestamps: true
});

// Index for efficient queries
businessChatbotSchema.index({ business: 1, 'conversations.status': 1 });
businessChatbotSchema.index({ 'conversations.lastMessageAt': -1 });

// Method to add a new message to a conversation
businessChatbotSchema.methods.addMessage = async function(conversationId, message) {
  const conversation = this.conversations.id(conversationId);
  if (!conversation) throw new Error('Conversation not found');
  
  conversation.messages.push(message);
  conversation.lastMessageAt = Date.now();
  
  await this.save();
  return conversation;
};

// Method to find matching response
businessChatbotSchema.methods.findResponse = function(message) {
  const activeResponses = this.responses.filter(r => r.isActive);
  return activeResponses.find(r => 
    message.toLowerCase().includes(r.trigger.toLowerCase())
  );
};

// Method to update analytics
businessChatbotSchema.methods.updateAnalytics = async function() {
  const resolvedConversations = this.conversations.filter(c => c.status === 'resolved');
  
  this.analytics = {
    totalConversations: this.conversations.length,
    resolutionRate: resolvedConversations.length / this.conversations.length * 100,
    averageResponseTime: this.calculateAverageResponseTime(),
    popularQueries: this.calculatePopularQueries()
  };
  
  await this.save();
  return this.analytics;
};

// Helper method to calculate average response time
businessChatbotSchema.methods.calculateAverageResponseTime = function() {
  let totalTime = 0;
  let totalResponses = 0;

  this.conversations.forEach(conv => {
    for (let i = 1; i < conv.messages.length; i++) {
      if (conv.messages[i].sender === 'bot' || conv.messages[i].sender === 'business') {
        const responseTime = conv.messages[i].timestamp - conv.messages[i-1].timestamp;
        totalTime += responseTime;
        totalResponses++;
      }
    }
  });

  return totalResponses > 0 ? totalTime / totalResponses : 0;
};

// Helper method to calculate popular queries
businessChatbotSchema.methods.calculatePopularQueries = function() {
  const queries = {};
  
  this.conversations.forEach(conv => {
    conv.messages.forEach(msg => {
      if (msg.sender === 'user') {
        queries[msg.content] = (queries[msg.content] || 0) + 1;
      }
    });
  });

  return Object.entries(queries)
    .map(([query, count]) => ({ query, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
};

const BusinessChatbot = mongoose.model('BusinessChatbot', businessChatbotSchema);

module.exports = BusinessChatbot;