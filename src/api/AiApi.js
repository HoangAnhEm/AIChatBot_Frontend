import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ChatApiManager = axios.create({
  baseURL: "http://10.0.2.2:8080",
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json", 
    "Accept": "application/json",
  },
});

ChatApiManager.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 403) {
        console.warn("Token expired! Logging out...");
        await AsyncStorage.removeItem("accessToken"); // Remove token on 403
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const userData = {refreshToken};
        const headers = {'x-rtoken-id': refreshToken};
        try{
          const data = await ChatApiManager.post("v1/api/refresh-token",userData, {headers});
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
  
  ChatApiManager.interceptors.request.use(
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

const CHAT_API_URL = "/chat";

export const AIChat = async ({ query, personality }) => {
  try {
    const response = await ChatApiManager.post(CHAT_API_URL, {
      query,
      personality
    });
    return response.data.metadata;
  } catch (error) {
    console.error("Lỗi khi gọi API AI:", error);
    throw error;
  }
};

const ASK_API_URL = "/ask";
export const AIAsk = async ({ query }) => {
  try {
    const response = await ChatApiManager.post(ASK_API_URL, {
      query,
    });
    return response.data.metadata;
  } catch (error) {
    console.error("Lỗi khi gọi API AI:", error);
    throw error;
  }
};
