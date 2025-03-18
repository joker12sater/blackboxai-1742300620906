import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

class BusinessService {
  // Business Profile
  async getBusinessDetails(businessId) {
    try {
      const response = await axios.get(`${API_URL}/business/${businessId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateBusinessDetails(businessId, data) {
    try {
      const response = await axios.put(`${API_URL}/business/${businessId}`, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Subscriptions
  async getSubscription(businessId) {
    try {
      const response = await axios.get(`${API_URL}/business/${businessId}/subscription`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async subscribe(businessId, planData) {
    try {
      const response = await axios.post(`${API_URL}/business/${businessId}/subscription`, planData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async cancelSubscription(businessId) {
    try {
      const response = await axios.delete(`${API_URL}/business/${businessId}/subscription`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Chatbot
  async getChatbot(businessId) {
    try {
      const response = await axios.get(`${API_URL}/business/${businessId}/chatbot`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateChatbotSettings(businessId, settings) {
    try {
      const response = await axios.put(`${API_URL}/business/${businessId}/chatbot/settings`, settings);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async sendChatbotMessage(businessId, conversationId, message) {
    try {
      const response = await axios.post(`${API_URL}/business/${businessId}/chatbot/messages`, {
        conversationId,
        message
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Reviews
  async getReviews(businessId) {
    try {
      const response = await axios.get(`${API_URL}/business/${businessId}/reviews`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async respondToReview(businessId, reviewId, response) {
    try {
      const result = await axios.post(`${API_URL}/business/${businessId}/reviews/${reviewId}/respond`, {
        response
      });
      return result.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Location
  async getBusinessLocation(businessId) {
    try {
      const response = await axios.get(`${API_URL}/business/${businessId}/location`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateBusinessLocation(businessId, location) {
    try {
      const response = await axios.put(`${API_URL}/business/${businessId}/location`, location);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateLocationSettings(businessId, settings) {
    try {
      const response = await axios.put(`${API_URL}/business/${businessId}/location/settings`, settings);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error Handling
  handleError(error) {
    if (error.response) {
      // Server responded with error
      const message = error.response.data.message || 'An error occurred';
      return new Error(message);
    } else if (error.request) {
      // Request made but no response
      return new Error('Unable to connect to server');
    } else {
      // Error in request setup
      return new Error('Error setting up request');
    }
  }

  // Authentication Headers
  setAuthHeader() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  clearAuthHeader() {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default new BusinessService();