import ApiManager from "../api/ApiManager";

export const registerUser = async (userData: any) => {
  try {
    const response = await ApiManager.post("v1/api/register", userData,);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};
export const loginUser = async (userData: any) => {
  try{
    const response = await ApiManager.post("v1/api/login", userData);
    return response.data;
  } catch (error){
    console.error("Login Error:", error);
    throw error;
  }
};
export const getOTP = async (userData: any) => {
  try{
    const response = await ApiManager.post("v1/api/otp", userData);
    return response.data;
  } catch (error){
    console.error("OTP Error:", error);
    throw error;
  }
};

export const verifyOTP = async (userData: any, headers: object = {}) => {
  try{
    const response = await ApiManager.post("v1/api/verifyOTP", userData, {headers});
    return response.data;
  } catch (error){
    console.error("Verify Error:", error);
    throw error;
  }
};

export const forgotPassword = async (userData: any) => {
  try{
    const response = await ApiManager.post("v1/api/forgotPassword", userData);
    return response.data;
  } catch (error){
    console.error("OTP Error:", error);
    throw error;
  }
};

