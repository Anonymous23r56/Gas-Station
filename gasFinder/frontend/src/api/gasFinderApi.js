import axios from "axios";

// Backend is running on port 5000
const API_BASE_URL = "http://localhost:5000/api";

export const gasFinderApi = {
  // Get all gas stations (with optional status filter)
  getAllStations: async (status = null) => {
    try {
      const params = status ? { status } : {};
      const response = await axios.get(`${API_BASE_URL}/stations`, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching gas stations:", error);
      throw error;
    }
  },

  // Get nearby stations based on user location
  getNearbyStations: async (lat, lon, radius = 5) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stations/nearby`, {
        params: { lat, lon, radius },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching nearby stations:", error);
      throw error;
    }
  },

  // Get single station by ID
  getStationById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stations/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching station:", error);
      throw error;
    }
  },

  // Create a new station (admin functionality)
  createStation: async (stationData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/stations`,
        stationData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating station:", error);
      throw error;
    }
  },

  // Update a station
  updateStation: async (id, stationData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/stations/${id}`,
        stationData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating station:", error);
      throw error;
    }
  },

  // Delete a station
  deleteStation: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/stations/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting station:", error);
      throw error;
    }
  },
  //create a new station(admin functionality)

  createStation: async (stationData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/stations`,
        stationData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating station:", error);
      throw error;
    }
  },
};
