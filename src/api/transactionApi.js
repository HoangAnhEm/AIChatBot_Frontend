import axios from "axios";
import Transaction from "../model/Transaction.model"

const API_BASE_URL = "http://10.0.2.2:3000/expense"; 

const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjIzNzkxNDk3NmRjMmY0OGJhMTk2YSIsIm5hbWUiOiJ0dWFuX3Rlc3QiLCJlbWFpbCI6InR1YW5fdGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3Mzk3MzI4ODIsImV4cCI6MTczOTczMzc4Mn0.jpEYA7uLZAEeiwOPRhsV9UewDJWpz9EV_GQ-xT8MmCs";
const refresh_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjIzNzkxNDk3NmRjMmY0OGJhMTk2YSIsIm5hbWUiOiJ0dWFuX3Rlc3QiLCJlbWFpbCI6InR1YW5fdGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3Mzk3MzI4ODIsImV4cCI6MTc0MDMzNzY4Mn0._kFO09-HRdPsUKoHNwLr9wPhYd1Z_BPSq39hvDbRuj8";

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${access_token}`,
  'x-rtoken-id': refresh_token,
};

// const userId = "67b237914976dc2f48ba196a";

export const createTransactions = async ({ amount, wallet, partner, type, category, description }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/add-expense`, 
        {amount, wallet, partner, type, category, description}, 
        {headers: headers}
    );
      return response.metadata;
    } catch (error) {
      console.error("Lỗi khi tạo giao dịch:", error);
      throw error; 
    }
};

export const getTransactions = async ({ category, type, searchText, startDate, endDate, page, pageSize }) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/get-expense`, {
          params: {category, type, searchText, startDate, endDate, page, pageSize}, 
          headers: headers
      });

      const transactions = response.data.metadata.Expenses.map(tx => new Transaction(tx));
      return transactions; 

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
