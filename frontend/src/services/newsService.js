import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const newsService = {
  // News Articles
  getNews: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/news`, { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch news');
    }
  },

  getNewsArticle: async (articleId) => {
    try {
      const response = await axios.get(`${API_URL}/news/${articleId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch article');
    }
  },

  // Categories
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/news/categories`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },

  // Events
  getEvents: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/events`, { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch events');
    }
  },

  getEventDetails: async (eventId) => {
    try {
      const response = await axios.get(`${API_URL}/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch event details');
    }
  },

  createEvent: async (eventData) => {
    try {
      const response = await axios.post(`${API_URL}/events`, eventData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create event');
    }
  },

  updateEvent: async (eventId, eventData) => {
    try {
      const response = await axios.put(`${API_URL}/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update event');
    }
  },

  deleteEvent: async (eventId) => {
    try {
      const response = await axios.delete(`${API_URL}/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete event');
    }
  },

  // Subscriptions
  getSubscriptionPreferences: async () => {
    try {
      const response = await axios.get(`${API_URL}/news/preferences`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch preferences');
    }
  },

  updateSubscriptionPreferences: async (preferences) => {
    try {
      const response = await axios.put(`${API_URL}/news/preferences`, preferences);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update preferences');
    }
  },

  // Notifications
  subscribeToNotifications: async (subscription) => {
    try {
      const response = await axios.post(`${API_URL}/news/notifications/subscribe`, subscription);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to subscribe to notifications');
    }
  },

  unsubscribeFromNotifications: async () => {
    try {
      const response = await axios.post(`${API_URL}/news/notifications/unsubscribe`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to unsubscribe from notifications');
    }
  },

  // Search
  searchNews: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/news/search`, { params: { q: query } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search news');
    }
  },

  // Trending
  getTrendingNews: async () => {
    try {
      const response = await axios.get(`${API_URL}/news/trending`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch trending news');
    }
  },

  // Error Handler
  handleError: (error) => {
    console.error('News Service Error:', error);
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    throw new Error(message);
  }
};

// Request Interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default newsService;