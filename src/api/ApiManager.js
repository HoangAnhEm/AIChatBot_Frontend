import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "./navigationRef";

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
    if (error.response && error.response.status === 403) {
      console.warn("Token expired! Logging out...");
      await AsyncStorage.removeItem("accessToken"); // Remove token on 403
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const userData = {refreshToken};
      const headers = {'x-rtoken-id': refreshToken};
      try{
        const data = await ApiManager.post("v1/api/refresh-token",userData, {headers});
        await AsyncStorage.setItem('accessToken', result.metadata.accessToken);
        await AsyncStorage.setItem('refreshToken', result.metadata.refreshToken);
      }
      catch(error){
        console.log("Error:", error);
      }

      // Optionally: Navigate to login screen
      // navigate('Login');
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