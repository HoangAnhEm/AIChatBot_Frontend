import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image} from "react-native";

type Transaction = {
    id: string;
    type: string;
    amount: number;
    status: string;
    date: string;
    time: string;
};
    

const TransactionItem = ({transaction} : {transaction: Transaction }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return styles.pending;
      case "confirmed":
        return styles.confirmed;
      case "canceled":
        return styles.canceled;
      default:
        return {};
    }
  }

  return (
    <TouchableOpacity style={styles.container}>
      {/* Icon Bên Trái */}
      <View style={styles.iconContainer}>
        <Image source={require("../assets/icon.png")} style={styles.icon} />
      </View>

      {/* Nội dung */}
      <View style={styles.content}>
        <Text style={styles.title}>{transaction.type}</Text>
        <Text style={styles.subTitle}>Transaction ID</Text>
        <Text style={styles.transactionId}>{transaction.id}</Text>
      </View>

      {/* Số tiền & Trạng thái */}
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>${transaction.amount.toFixed(2)}</Text>
        <Text style={[styles.status, getStatusStyle(transaction.status)]}>
          {transaction.status}    
        </Text>
        <Text style={styles.date}>{transaction.date} {transaction.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  confirmed: { color: "green", backgroundColor: "#C8E6C9"},
  canceled: { color: "red", backgroundColor: "#FFCDD2"},
  pending: {color: "orange", backgroundColor: "#FFE8B3"},

  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    marginVertical: 8,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#D7E3FC",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B1B1B",
  },
  subTitle: {
    fontSize: 12,
    color: "#A0A0A0",
  },
  transactionId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#343434",
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  status: {
    fontWeight: "bold",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF9800",
  },
  date: {
    fontSize: 12,
    color: "#A0A0A0",
    marginTop: 4,
  },
});

export default TransactionItem;
