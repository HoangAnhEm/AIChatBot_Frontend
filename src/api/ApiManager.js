import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ApiManager = axios.create({
  baseURL: "http://10.0.2.2:3000", // Replace with actual API URL
  timeout: 5000, // Optional: Set request timeout (in ms)
  headers: {
    "Content-Type": "application/json", // Set default headers
    "Accept": "application/json",
  },
});

ApiManager.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token expired! Logging out...");
      await AsyncStorage.removeItem("accessToken"); // Remove token on 401
      // Optionally: Navigate to login screen
    }
    return Promise.reject(error);
  }
);

ApiManager.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken"); // Get token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiManager;