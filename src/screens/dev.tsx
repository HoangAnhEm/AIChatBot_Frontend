import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import transactions from './FakeData'
import { createTransactions } from "../api/transactionApi"

const App = () => {
    const transactions_month3 = transactions.transactions_month3
    const createMultipleTransactions = async () => {
        try {
        const responses = await Promise.all(
            transactions_month3.map(expense =>
            createTransactions(expense)
            )
        );
        console.log("Tạo giao dịch thành công:");
        } catch (error) {
        console.error("Lỗi khi tạo giao dịch:", error);
        }
    };

  const handlePress = () => {
    createMultipleTransactions();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Bấm vào đây!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default App;
