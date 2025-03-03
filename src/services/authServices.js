import ApiManager from "../api/ApiManager";

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await ApiManager.post("v1/api/register", userData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await ApiManager.post("v1/api/login", userData);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// Get OTP
export const getOTP = async (userData) => {
  try {
    const response = await ApiManager.post("v1/api/otp", userData);
    return response.data;
  } catch (error) {
    console.error("OTP Error:", error);
    throw error;
  }
};

// Verify OTP
export const verifyOTP = async (userData, headers = {}) => {
  try {
    const response = await ApiManager.post("v1/api/verifyOTP", userData, { headers });
    return response.data;
  } catch (error) {
    console.error("Verify Error:", error);
    throw error;
  }
};

// Forgot Password
export const forgotPassword = async (userData) => {
  try {
    const response = await ApiManager.post("v1/api/forgotPassword", userData);
    return response.data;
  } catch (error) {
    console.error("Forgot Password Error:", error);
    throw error;
  }
};

// Refresh Token
export const refreshToken = async (userData, headers = {}) => {
  try {
    const response = await ApiManager.post("v1/api/refresh-token", userData, { headers });
    return response.data;
  } catch (error) {
    console.error("Refresh Token Error:", error);
    throw error;
  }
};

// Get Expenses (Fixed GET Request)
export const expenseGet = async (params = {}) => {
  try {
    const response = await ApiManager.get("v1/api/get-expense", { params });
    return response.data;
  } catch (error) {
    console.error("Expense Get Error:", error);
    throw error;
  }
};
