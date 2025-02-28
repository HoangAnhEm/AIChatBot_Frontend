import React, {useState} from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/Feather";
import Transaction from "../model/Transaction.model";
import { CATEGORIES } from '../constants/categories';


interface TransferEditModalProps {
  visible: boolean;
  updateConfirm: (
    category_: string, 
    description_: string,
    amount_: number
  ) => void;
  close: () => void;
  transactionInfo: Transaction;
}


const TransferEditModal = ({visible, updateConfirm, transactionInfo, close }: TransferEditModalProps) => {
    if(transactionInfo === undefined)
        return <Text></Text>;
      
    const [transaction, settransaction] = useState(`${transactionInfo.amount}`);
    const [categorie, setCategorie] = useState(transactionInfo.category);
    const [description, setDescription] = useState(transactionInfo.description);

    const handleInputChange = (text : string) => {
      let numericValue
      if(text.length < transaction.length)
        numericValue = text.replace(/\D/g, "").slice(0, -1);
      else
        numericValue = text.replace(/\D/g, "");

      if (numericValue === "") {
          settransaction("");
          return;
      }
      let formattedValue = Number(numericValue).toLocaleString();
      settransaction(formattedValue + " VND");
  };

    const handleProceed = () => {
        updateConfirm(categorie, description, Number(transaction.replace(/\D/g, "")));
        close()
      };

    const truncateText = (text: string, maxLength = 7) => {
      if (!text) return ""; 
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.card}>
            <View style={styles.transferContainer}>
                <View style={styles.avatarContainer}>
                    <Image source={require("../assets/avatar.png")} style={styles.avatar} />
                    <Text>User Name</Text>
                </View>
                <Icon name="repeat" size={24} color="green" />
                <View style={styles.avatarContainer}>
                    <Image source={require("../assets/avatar.png")} style={styles.avatar} />
                    <Text>{truncateText(transactionInfo.partner)}</Text>
                </View>
            </View>
            <Text style={styles.title}>Enter transaction details</Text>

            <TextInput
                style={styles.input}
                placeholder="Transaction amount"
                keyboardType="phone-pad" 
                value={transaction}
                onChangeText={handleInputChange}
            />

            
            <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            />      

            <Dropdown
            style={styles.dropdown}
            data={CATEGORIES}
            labelField="label"
            valueField="name"
            placeholder={categorie}
            value={categorie}
            onChange={(item) => setCategorie(item.name)}
            />

            <TouchableOpacity style={styles.proceedButton} onPress={() => {handleProceed()}}>
              <Text style={styles.proceedText}>Proceed</Text>
            </TouchableOpacity>

            
            <TouchableOpacity style={styles.proceedButton} onPress={close}>
              <Text style={styles.proceedText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Màu đen mờ
  },
//   modalContainer: {
//     width: 300,
//     padding: 20,
//     borderRadius: 15,
//     backgroundColor: "red",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 5,
//   },
  transferContainer: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 40, padding: 20,},
  avatarContainer: {flexDirection: "column"},
  avatar: { width: 60, height: 60, borderRadius: 30 },
  card: {
    width: 320,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#F0F0F0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  dropdown: {
    width: "100%",
    backgroundColor: "#F0F0F0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  proceedButton: {
    width: "100%",
    backgroundColor: "#5D9CEC",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  proceedText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TransferEditModal;
