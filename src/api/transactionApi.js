import axios from "axios";

const API_BASE_URL = "http://10.0.2.2:3000/expense"; 

export const createTransactions = async ({ amount, wallet, partner, type, category, description, userId }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/add_fee`, 
        { amount, wallet, partner, type, category, description, userId }, 
        {headers: {'Content-Type': 'application/json'}}
    );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo giao dịch:", error);
      throw error; 
    }
};

export const getTransactions = async ({ category, searchText, startDate, endDate, limit, userId }) => {
    try {
        const response = await axios.get(
          `${API_BASE_URL}/get_fee`, 
          { category, searchText, startDate, endDate, limit, userId }, 
          {headers: {'Content-Type': 'application/json'}}
      );
        return response.data;
      } catch (error) {
        console.error("Lỗi khi lấy giao dịch:", error);
        throw error; 
      }
  };

export const updateTransaction = async (transactionId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/transactions/${transactionId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật giao dịch:", error);
    throw error;
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa giao dịch:", error);
    throw error;
  }
};
