import React, { useState } from "react";
import { View, TouchableOpacity, Button, Text, StyleSheet } from "react-native";
import { createTransactions } from "../api/transactionApi";
import { createMultipleTransactions } from "./dev2";

const AddTransactionScreen = () => {
  const handleAddTransaction = async () => {
    // const res = await createMultipleTransactions();

    // console.log(res);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.operationButton} onPress={handleAddTransaction}>
          <Text style={styles.text}>BUTTON</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: '#fff',
    flex: 1,
  },
  operationButton: {backgroundColor: '#BEC1EB', borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 15 , marginRight: 10},
  text: {color: 'white'},
});

export default AddTransactionScreen;
