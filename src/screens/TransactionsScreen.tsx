import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import TransactionItem from "../components/transactionItem";
import Icon from "react-native-vector-icons/Feather";

import TimeSelect from "../components/timeSelectButton"

const transactions = [
  { id: "1", type: "Cash-in", amount: 100.0, status: "confirmed", date: "17 Sep 2023", time: "10:34 AM" },
  { id: "2", type: "Cashback from purchase", amount: 1.75, status: "confirmed", date: "16 Sep 2023", time: "16:08 PM" },
  { id: "3", type: "Transfer to card", amount: 9000.0, status: "pending", date: "16 Sep 2023", time: "11:21 AM" },
  { id: "4", type: "Transfer to card", amount: 9267.0, status: "canceled", date: "15 Sep 2023", time: "10:11 AM" },
  { id: "5", type: "Cashback from purchase", amount: 3.21, status: "confirmed", date: "14 Sep 2023", time: "18:59 PM" },
  { id: "6", type: "Online Payment", amount: 250.0, status: "confirmed", date: "13 Sep 2023", time: "09:45 AM" },
  { id: "7", type: "Subscription", amount: 9.99, status: "pending", date: "12 Sep 2023", time: "12:30 PM" },
  { id: "8", type: "Transfer to wallet", amount: 500.0, status: "confirmed", date: "11 Sep 2023", time: "14:20 PM" },
  { id: "9", type: "Refund", amount: 20.5, status: "confirmed", date: "10 Sep 2023", time: "17:45 PM" },
  { id: "10", type: "Bank Transfer", amount: 750.0, status: "canceled", date: "09 Sep 2023", time: "08:10 AM" },
  { id: "11", type: "Transfer to card", amount: 2000.0, status: "pending", date: "08 Sep 2023", time: "15:25 PM" },
  { id: "12", type: "Cash-in", amount: 500.0, status: "confirmed", date: "07 Sep 2023", time: "09:00 AM" },
  { id: "13", type: "Online Purchase", amount: 99.99, status: "confirmed", date: "06 Sep 2023", time: "19:30 PM" },
  { id: "14", type: "Bill Payment", amount: 120.0, status: "canceled", date: "05 Sep 2023", time: "16:15 PM" },
  { id: "15", type: "Transfer to wallet", amount: 300.0, status: "pending", date: "04 Sep 2023", time: "11:50 AM" },
  { id: "16", type: "Cashback from purchase", amount: 2.75, status: "confirmed", date: "03 Sep 2023", time: "21:45 PM" },
  { id: "17", type: "Online Payment", amount: 199.99, status: "confirmed", date: "02 Sep 2023", time: "14:10 PM" },
  { id: "18", type: "Refund", amount: 50.0, status: "canceled", date: "01 Sep 2023", time: "10:55 AM" },
  { id: "19", type: "Subscription", amount: 4.99, status: "pending", date: "31 Aug 2023", time: "23:59 PM" },
  { id: "20", type: "Bank Transfer", amount: 1500.0, status: "confirmed", date: "30 Aug 2023", time: "07:30 AM" }
];


const wallets = [
    { label: "💳  Wallet number 1"},
    { label: "💳  Wallet number 2"},
    { label: "💳  Wallet number 3"},
  ];

  

const TransactionsScreen = () => {
    const [selectedWallet, setSelectedWallet] = useState(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
          <Dropdown
          style={styles.dropdown}
          data={wallets}
          labelField="label"
          valueField="label"
          placeholder="categories"
          value={selectedWallet}
          onChange={(item) => setSelectedWallet(item.label)}
          />

        <TouchableOpacity style={styles.iconButton}>
          <Icon name="search" size={17} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text>⋮</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.timeSelectContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScrollView}>
          <TimeSelect label= "This Week" onPress={() => {}}/>
          <TimeSelect label= "Last Week" onPress={() => {}}/>
          <TimeSelect label= "This Month" onPress={() => {}}/>
          <TimeSelect label= "Last Month" onPress={() => {}}/>
        </ScrollView>
      </View>

      {/* Danh sách giao dịch */}
      <View style={styles.transactionsLog}>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem transaction = {item} />}
        />
      </View>

      {/* Nút Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'rgba(128, 128, 128, 0.05)'},
  header: { flexDirection: "row", gap: 20, paddingTop: 60, paddingHorizontal: 20, paddingBottom: 10, alignItems: "center", backgroundColor: "white" },
  timeSelectContainer: {marginVertical: 20, paddingHorizontal: 20},
  timeScrollView: {},
  iconButton: {
    width: 40, 
    height: 40,
    justifyContent: "center", 
    alignItems: "center", 
    borderWidth: 2,
    borderColor: 'rgba(128, 128, 128, 0.2)',
    borderRadius: 8, 
    backgroundColor: "white", 
  },
  transactionsLog:{
    paddingHorizontal: 20,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#3D82F6",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingButtonText: { color: "white", fontSize: 30 },
  dropdown: {
    flex: 1,
    backgroundColor: "#BEC1EB",
    padding: 12,
    borderRadius: 8,
  },
});

export default TransactionsScreen;
