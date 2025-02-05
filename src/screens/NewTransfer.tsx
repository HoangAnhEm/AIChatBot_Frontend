import React, { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Feather";

const transactions = [
  { id: "1", name: "Dan", amount: "-$314", avatar: require("../assets/avatar.png"), color: "red" },
  { id: "2", name: "Amanda", amount: "+$90", avatar: require("../assets/avatar.png"), color: "green" },
  { id: "3", name: "Pete", amount: "-$19", avatar: require("../assets/avatar.png"), color: "red" },
];

const NewTransferScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const confirmTransaction = () => {
    if (transactionType !== '' && wallet !== '' && transactionPartner != ''){
      navigation.navigate('PaymentScreen');
    }
  }
  
  const [transactionType, setTransactionType] = useState("");
  const [wallet, setWallet] = useState("");
  const [transactionPartner, setTransactionPartner] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => {navigation.goBack()}}>
          <Ionicons name="arrow-back" size={24} color="green" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.greeting}>Hello, Jennifer!</Text>
        <Image source={require("../assets/avatar.png")} style={styles.avatar} />
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, transactionType === "Send" && styles.selectedActionButton]} onPress={() => {setTransactionType("Send")}}>
          <Icon name="arrow-up" size={30} color="#4a90e2" />
          <Text style={styles.actionText}>Send money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, transactionType === "Get" && styles.selectedActionButton]} onPress={() => {setTransactionType("Get")}}>
          <Icon name="arrow-down" size={30} color="#4a90e2" />
          <Text style={styles.actionText}>Get money</Text>
        </TouchableOpacity>
      </View>

      {/* My Cards */}
      <View style={styles.cardsContainer}>
        <Text style={styles.sectionTitle}>My wallet</Text>
        <TouchableOpacity style={[styles.card, wallet === "Wallet number 1" && styles.selectedCard]} onPress={() => {setWallet("Wallet number 1")}}>
          <Icon name="credit-card" size={20} color="#2c3e50" />
          <Text style={styles.cardText}>Wallet number 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, wallet === "Wallet number 2" && styles.selectedCard]} onPress={() => {setWallet("Wallet number 2")}}>
          <Icon name="credit-card" size={20} color="#2c3e50" />
          <Text style={styles.cardText}>Wallet number 2</Text>
        </TouchableOpacity>
      </View>

      {/* Transactions */}
      <View style={styles.transactionsContainer}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          <Text style={styles.sortText}>Sort by recent</Text>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isSelected = item.name === transactionPartner;

            return (
              <View style={[styles.transactionItemContainer, isSelected && {backgroundColor: 'rgba(128, 128, 128, 0.2)'}]} >
                <TouchableOpacity style={styles.transactionItem }                              
                                          onPress={() => {setTransactionPartner(item.name)}}>
                  <Image source={item.avatar} style={styles.transactionAvatar} />
                  <Text style={styles.transactionName}>{item.name}</Text>
                  <Text style={[styles.transactionAmount, { color: item.color }]}>{item.amount}</Text>
                </TouchableOpacity>
              </View>
            )}
          } 
        />

        <TouchableOpacity style={styles.addButton}>
            <Icon name="user-plus" size={20} color="#2c3e50" />
            <Text style={styles.cardText}>New user</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.gap}></View>

      <TouchableOpacity style={styles.proceedButton} onPress={() => {confirmTransaction()}}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f7f8fc", padding: 20 , marginTop: 30},
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  greeting: { fontSize: 22, fontWeight: "bold", color: "#333" },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  
  actions: { flexDirection: "row", justifyContent: "space-between", marginVertical: 20 },
  actionButton: { backgroundColor: "white", flex: 1, padding: 20, margin: 5, borderRadius: 10, alignItems: "center" },
  actionText: { marginTop: 5, fontSize: 14, color: "#4a90e2" },
  selectedActionButton: {
      borderWidth: 2, 
      borderColor: "#4a90e2",
  },
  cardsContainer: { backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 10 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#edf2f7", padding: 15, borderRadius: 10, marginBottom: 10 },
  cardText: { marginLeft: 10, fontSize: 16, color: "#2c3e50" },
  selectedCard: {
      borderColor: "blue", 
      borderWidth: 2,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    // position: "absolute",
    // top: 40,
    // left: 20,
  },
  backText: {
    fontSize: 16,
    color: "green",
    marginLeft: 5,
  },

  transactionsContainer: { backgroundColor: "white", borderRadius: 10 },
  transactionsHeader: { flexDirection: "row", paddingHorizontal: 15, justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  sortText: { color: "green", fontSize: 14 },

  transactionItemContainer: { paddingHorizontal: 10, },
  transactionItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  transactionAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  transactionName: { flex: 1, fontSize: 16, color: "#333" },
  transactionAmount: { fontSize: 16, fontWeight: "bold" },
  addButton: { flexDirection: "row", alignItems: "center", alignSelf: "center", backgroundColor: "#edf2f7", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 15, marginVertical: 15 },
  gap: {flex: 1},
  proceedButton: {
    width: "100%",
    backgroundColor: "#5D9CEC",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  proceedText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NewTransferScreen;
