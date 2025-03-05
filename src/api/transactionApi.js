import Transaction from "../model/Transaction.model";
import ApiManager from "./ApiManager"; 

const EXPENSE_API = "/expense";

export const createTransactions = async ({ amount, wallet, partner, type, category, description,}) => {
  try {
    const response = await ApiManager.post(`${EXPENSE_API}/add-expense`, {
      amount,
      wallet,
      partner,
      type,
      category,
      description,
    });
    return response.data.metadata;
  } catch (error) {
    console.error("Lỗi khi tạo giao dịch:", error);
    throw error;
  }
};

export const getTransactions = async ({ category, type, searchText, startDate, endDate, page, pageSize }) => {
  try {
    const response = await ApiManager.get(`${EXPENSE_API}/get-expense`, {
      params: {
        category,
        type,
        searchText,
        startDate,
        endDate,
        page,
        pageSize,
      },
    });

    const transactions = response.data.metadata.Expenses.map((tx) => new Transaction(tx));
    return transactions;
  } catch (error) {
    console.error("Lỗi khi lấy giao dịch:", error);
    throw error;
  }
};

export const updateTransaction = async ({ expenseId, updateData }) => {
  try {
    const response = await ApiManager.patch(`${EXPENSE_API}/${expenseId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật expense:", error);
    return false;
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    const response = await ApiManager.delete(`${EXPENSE_API}/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa giao dịch:", error);
    throw error;
  }
};
