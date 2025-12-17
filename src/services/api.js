const API_BASE_URL = '/api';

export const merchantAPI = {
  // Get merchant summary
  getSummary: async (merchantIds) => {
    try {
      const response = await fetch(`${API_BASE_URL}/merchant/summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mid: merchantIds,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching merchant summary:', error);
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await fetch('http://merchant-backend:8080/health');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  },
};

export default merchantAPI;
