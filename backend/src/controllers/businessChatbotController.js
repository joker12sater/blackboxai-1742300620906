const BusinessChatbot = require('../models/BusinessChatbot');
const Business = require('../models/Business');

// Initialize or get chatbot
exports.initializeChatbot = async (req, res) => {
  try {
    let chatbot = await BusinessChatbot.findOne({ business: req.params.businessId });

    if (!chatbot) {
      chatbot = await BusinessChatbot.create({
        business: req.params.businessId,
        responses: [
          {
            trigger: 'hours',
            response: 'Our business hours can be found on our profile page.'
          },
          {
            trigger: 'location',
            response: 'You can find our location details on our profile page.'
          },
          {
            trigger: 'contact',
            response: 'Please visit our profile page for contact information.'
          }
        ]
      });
    }

    res.json({
      success: true,
      data: chatbot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update chatbot settings
exports.updateSettings = async (req, res) => {
  try {
    const chatbot = await BusinessChatbot.findOne({ business: req.params.businessId });

    if (!chatbot) {
      return res.status(404).json({
        success: false,
        message: 'Chatbot not found'
      });
    }

    // Update settings
    chatbot.settings = {
      ...chatbot.settings,
      ...req.body
    };

    await chatbot.save();

    res.json({
      success: true,
      data: chatbot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add or update response
exports.updateResponses = async (req, res) => {
  try {
    const chatbot = await BusinessChatbot.findOne({ business: req.params.businessId });

    if (!chatbot) {
      return res.status(404).json({
        success: false,
        message: 'Chatbot not found'
      });
    }

    const { responses } = req.body;

    // Update or add new responses
    responses.forEach(newResponse => {
      const existingIndex = chatbot.responses.findIndex(
        r => r.trigger === newResponse.trigger
      );

      if (existingIndex >= 0) {
        chatbot.responses[existingIndex] = {
          ...chatbot.responses[existingIndex],
          ...newResponse
        };
      } else {
        chatbot.responses.push(newResponse);
      }
    });

    await chatbot.save();

    res.json({
      success: true,
      data: chatbot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Start new conversation
exports.startConversation = async (req, res) => {
  try {
    const chatbot = await BusinessChatbot.findOne({ business: req.params.businessId });

    if (!chatbot) {
      return res.status(404).json({
        success: false,
        message: 'Chatbot not found'
      });
    }

    // Create new conversation
    const conversation = {
      user: req.user.id,
      messages: [{
        sender: 'bot',
        content: chatbot.settings.welcomeMessage
      }]
    };

    chatbot.conversations.push(conversation);
    await chatbot.save();

    res.status(201).json({
      success: true,
      data: conversation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Send message in conversation
exports.sendMessage = async (req, res) => {
  try {
    const chatbot = await BusinessChatbot.findOne({ business: req.params.businessId });

    if (!chatbot) {
      return res.status(404).json({
        success: false,
        message: 'Chatbot not found'
      });
    }

    const { conversationId, message } = req.body;
    const conversation = chatbot.conversations.id(conversationId);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    // Add user message
    const userMessage = {
      sender: 'user',
      content: message
    };
    
    conversation.messages.push(userMessage);
    conversation.lastMessageAt = Date.now();

    // Generate bot response
    const matchedResponse = chatbot.findResponse(message);
    if (matchedResponse && chatbot.settings.autoReply) {
      const botMessage = {
        sender: 'bot',
        content: matchedResponse.response
      };
      conversation.messages.push(botMessage);
    }

    await chatbot.save();

    res.json({
      success: true,
      data: conversation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get conversation history
exports.getConversations = async (req, res) => {
  try {
    const chatbot = await BusinessChatbot.findOne({ business: req.params.businessId })
      .populate('conversations.user', 'username profile.firstName profile.lastName');

    if (!chatbot) {
      return res.status(404).json({
        success: false,
        message: 'Chatbot not found'
      });
    }

    const { status, limit = 10, page = 1 } = req.query;
    let conversations = chatbot.conversations;

    // Filter by status if provided
    if (status) {
      conversations = conversations.filter(c => c.status === status);
    }

    // Sort by last message date
    conversations.sort((a, b) => b.lastMessageAt - a.lastMessageAt);

    // Paginate results
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedConversations = conversations.slice(startIndex, endIndex);

    res.json({
      success: true,
      count: conversations.length,
      data: paginatedConversations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get chatbot analytics
exports.getAnalytics = async (req, res) => {
  try {
    const chatbot = await BusinessChatbot.findOne({ business: req.params.businessId });

    if (!chatbot) {
      return res.status(404).json({
        success: false,
        message: 'Chatbot not found'
      });
    }

    await chatbot.updateAnalytics();

    res.json({
      success: true,
      data: chatbot.analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};