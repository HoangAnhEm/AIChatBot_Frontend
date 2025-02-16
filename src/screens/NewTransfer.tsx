import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Feather";
import CustomModal from "../components/modal"
import {getTransactions} from "../api/transactionApi"
import Transaction from "../model/Transaction.model"
import NewPartnerModal from '../components/newPartnerModal'



const NewTransferScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPartnerModalVisible, setIsPartnerModalVisible] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [wallet, setWallet] = useState("");
  const [transactionPartner, setTransactionPartner] = useState("Unknown");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const confirmTransaction = () => {
    if (transactionType !== '' && wallet !== '' && transactionPartner != '')
      navigation.navigate('TransferDetail', {type: transactionType, wallet: wallet, transactionPartner: transactionPartner});
    else
      setIsModalVisible(true);
  }

  const handleTransactionPartner = (partner : string) => {
    if (transactionPartner !== partner)
      setTransactionPartner(partner);
    else
      setTransactionPartner('Unknown');
  }

  const isPartnerExist = (name: string): boolean => 
    transactions.some((transaction) => transaction.partner === name);


  const handleNewPartner = (name: string) => {
    const param = {
        amount: 0, 
        wallet: "", 
        partner: name, 
        type: "", 
        category: "", 
        createdAt: null,
        description: "", 
        userId: "", 
    };

    const newPartner = new Transaction(param);

    setTransactions((prevTransactions) => [
      newPartner,  
      ...prevTransactions.slice(0, prevTransactions.length - 1), 
  ]);
};



  const fetchData = async () => {
    try {
        const data = await getTransactions({
          userId: "65f8c1e5b3a2a4d8f0e7a6b9", //fix
          category: "",
          searchText: "",
          startDate: "",
          endDate: "",
          limit: 3,
        });
        setTransactions(data);
    } catch (error) {
        console.error("Lỗi khi lấy giao dịch:", error);
    }
};


  useEffect(() => {
      fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => {navigation.goBack()}}>
          <Ionicons name="arrow-back" size={24} color="green" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        {/*fix*/}
        <Text style={styles.greeting}>Hello, Jennifer!</Text> 
        <Image source={require("../assets/avatar.png")} style={styles.avatar} />
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, transactionType === "Gửi" && styles.selectedActionButton]} onPress={() => {setTransactionType("Gửi")}}>
          <Icon name="arrow-up" size={30} color="#4a90e2" />
          <Text style={styles.actionText}>Send money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, transactionType === "Nhận" && styles.selectedActionButton]} onPress={() => {setTransactionType("Nhận")}}>
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
          <Text style={styles.sectionTitle}>Last Transactions</Text>
          <Text style={styles.sortText}>Sort by recent</Text>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            const isSelected = item.partner === transactionPartner;

            return (
              <View style={[styles.transactionItemContainer, isSelected && {backgroundColor: 'rgba(128, 128, 128, 0.2)'}]} >
                <TouchableOpacity style={styles.transactionItem }                              
                                          onPress={() => {handleTransactionPartner(item.partner)}}>
                  <Image source={require("../assets/avatar.png")} style={styles.transactionAvatar} />
                  <Text style={styles.transactionName}>{item.partner}</Text>
                  <Text style={[styles.transactionAmount, { color: item.amount === 0 ? 'orange' : item.type === "Nhận" ? 'green' : 'red'}]}>
                    {item.amount === 0 ? 'Processing' : item.type === "Nhận" ? `+${item.amount}` : `-${item.amount}`}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          } 
        />

        <TouchableOpacity style={styles.addButton} onPress={() => {setIsPartnerModalVisible(true)}}>
            <Icon name="user-plus" size={20} color="#2c3e50" />
            <Text style={styles.cardText}>New user</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.gap}></View>

      {/* Nut confirm */}
      <TouchableOpacity style={styles.proceedButton} onPress={() => {confirmTransaction()}}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal visible={isModalVisible} message="Vui lòng nhập đầy đủ thông tin!" onClose={() => setIsModalVisible(false)} />
      <NewPartnerModal visible={isPartnerModalVisible} onClose={() => setIsPartnerModalVisible(false)} check={isPartnerExist} save={handleNewPartner}/>
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
