import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
// import { createMultipleTransactions } from "./dev2";

const AddTransactionScreen = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTransaction = async () => {
    // createMultipleTransactions()
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Số tiền" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <TextInput placeholder="Danh mục" value={category} onChangeText={setCategory} />
      <TextInput placeholder="Mô tả" value={description} onChangeText={setDescription} />
      <Button title="Thêm Giao Dịch" onPress={handleAddTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: '#fff',
    flex: 1,
  }
});

export default AddTransactionScreen;
