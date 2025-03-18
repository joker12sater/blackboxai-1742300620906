import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const culturalService = {
  // Dictionary
  searchDictionary: async (query, language) => {
    try {
      const response = await axios.get(`${API_URL}/cultural/dictionary/search`, {
        params: { query, language }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search dictionary');
    }
  },

  getDictionaryEntry: async (entryId) => {
    try {
      const response = await axios.get(`${API_URL}/cultural/dictionary/${entryId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dictionary entry');
    }
  },

  // Contributions
  getContributions: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/cultural/contributions`, {
        params: filters
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch contributions');
    }
  },

  submitContribution: async (contributionData) => {
    try {
      const response = await axios.post(`${API_URL}/cultural/contributions`, contributionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit contribution');
    }
  },

  updateContribution: async (contributionId, contributionData) => {
    try {
      const response = await axios.put(
        `${API_URL}/cultural/contributions/${contributionId}`,
        contributionData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update contribution');
    }
  },

  deleteContribution: async (contributionId) => {
    try {
      const response = await axios.delete(`${API_URL}/cultural/contributions/${contributionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete contribution');
    }
  },

  // Voting
  getVotedContributions: async () => {
    try {
      const response = await axios.get(`${API_URL}/cultural/votes`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch voted contributions');
    }
  },

  submitVote: async (contributionId, voteType) => {
    try {
      const response = await axios.post(`${API_URL}/cultural/votes`, {
        contributionId,
        voteType
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit vote');
    }
  },

  // Comments
  getComments: async (contributionId) => {
    try {
      const response = await axios.get(`${API_URL}/cultural/contributions/${contributionId}/comments`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch comments');
    }
  },

  submitComment: async (contributionId, comment) => {
    try {
      const response = await axios.post(
        `${API_URL}/cultural/contributions/${contributionId}/comments`,
        { comment }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit comment');
    }
  },

  // Languages
  getLanguages: async () => {
    try {
      const response = await axios.get(`${API_URL}/cultural/languages`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch languages');
    }
  },

  // Categories
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/cultural/categories`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },

  // User Reputation
  getUserReputation: async () => {
    try {
      const response = await axios.get(`${API_URL}/cultural/reputation`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user reputation');
    }
  },

  // Reports
  submitReport: async (contributionId, reason) => {
    try {
      const response = await axios.post(`${API_URL}/cultural/reports`, {
        contributionId,
        reason
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit report');
    }
  },

  // Error Handler
  handleError: (error) => {
    console.error('Cultural Service Error:', error);
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

export default culturalService;