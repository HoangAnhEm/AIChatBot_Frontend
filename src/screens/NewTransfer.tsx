import React from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const transactions = [
  { id: "1", name: "Dan", amount: "-$314", avatar: require("../assets/icon.png"), color: "red" },
  { id: "2", name: "Amanda", amount: "+$90", avatar: require("../assets/icon.png"), color: "green" },
  { id: "3", name: "Pete", amount: "-$19", avatar: require("../assets/icon.png"), color: "red" },
];

const NewTransferScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Jennifer!</Text>
        <Image source={require("../assets/icon.png")} style={styles.avatar} />
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="arrow-up" size={30} color="#4a90e2" />
          <Text style={styles.actionText}>Send money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="arrow-down" size={30} color="#4a90e2" />
          <Text style={styles.actionText}>Request money</Text>
        </TouchableOpacity>
      </View>

      {/* My Cards */}
      <View style={styles.cardsContainer}>
        <Text style={styles.sectionTitle}>My cards</Text>
        <View style={styles.card}>
          <Icon name="credit-card" size={20} color="#2c3e50" />
          <Text style={styles.cardText}>Work card</Text>
        </View>
        <View style={styles.card}>
          <Icon name="credit-card" size={20} color="#2c3e50" />
          <Text style={styles.cardText}>Travel card</Text>
        </View>
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
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Image source={item.avatar} style={styles.transactionAvatar} />
              <Text style={styles.transactionName}>{item.name}</Text>
              <Text style={[styles.transactionAmount, { color: item.color }]}>{item.amount}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f8fc", padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  greeting: { fontSize: 22, fontWeight: "bold", color: "#333" },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  
  actions: { flexDirection: "row", justifyContent: "space-between", marginVertical: 20 },
  actionButton: { backgroundColor: "white", flex: 1, padding: 20, margin: 5, borderRadius: 10, alignItems: "center" },
  actionText: { marginTop: 5, fontSize: 14, color: "#4a90e2" },

  cardsContainer: { backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 10 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#edf2f7", padding: 15, borderRadius: 10, marginBottom: 10 },
  cardText: { marginLeft: 10, fontSize: 16, color: "#2c3e50" },

  transactionsContainer: { backgroundColor: "white", padding: 15, borderRadius: 10 },
  transactionsHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  sortText: { color: "green", fontSize: 14 },

  transactionItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  transactionAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  transactionName: { flex: 1, fontSize: 16, color: "#333" },
  transactionAmount: { fontSize: 16, fontWeight: "bold" },
});

export default NewTransferScreen;
