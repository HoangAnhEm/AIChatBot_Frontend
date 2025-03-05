import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image} from "react-native";
import Transaction from "../model/Transaction.model";
import Icon from "react-native-vector-icons/FontAwesome";
import {CATEGORIES} from "../constants/categories"


const TransactionItem = ({transaction, onPress} : {transaction: Transaction, onPress: () => void }) => {

  
  const getTransactionicon = (label: string) => {
      const category = CATEGORIES.find(cat => cat.name.trim() === label.trim());
      return category ? category.icon : 'question';
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Unknown":
        return styles.pending;
      case "nhận":
        return styles.confirmed;
      case "gửi":
        return styles.canceled;
      default:
        return {};
    }
  }


  const formatDate = (date: Date) => {
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }); 
  
    return formattedDate;
  };

  const formatTime = (date: Date) => {
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, 
    });
  
    return formattedTime;
  };

  const truncateText = (text: string, maxLength = 19) => {
    if (!text) return ""; 
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const amountFormat = (text : string) => {
    let formattedValue = Number(text).toLocaleString() ;
    return formattedValue + " VND";
};
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Icon Bên Trái */}
      <View style={styles.iconContainer}>
        <Icon name={getTransactionicon(transaction.category)} size={24} color='white'/>
      </View>

      {/* Nội dung */}
      <View style={styles.content}>
        <Text style={styles.title}>{truncateText(transaction.description)}</Text>
        <View style={styles.gap}></View>
        <Text style={styles.subTitle}>Transaction Partner</Text>
        <Text style={styles.transactionId}>{transaction.partner}</Text>
      </View>

      {/* Số tiền & Trạng thái */}
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{transaction.type === 'nhận' ? `+${amountFormat(transaction.amount)}` : `-${amountFormat(transaction.amount)}`}</Text>
        <Text style={[styles.status, getStatusStyle(transaction.type)]}>
          {transaction.type}    
        </Text>
        <Text style={styles.date}> {formatDate(transaction.createdAt)} {formatTime(transaction.createdAt)}</Text>
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
    backgroundColor: "rgba(121, 145, 243, 0.5)",
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
  gap:{flex : 1},
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B1B1B",
  },
  subTitle: {
    marginTop: 10,
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
