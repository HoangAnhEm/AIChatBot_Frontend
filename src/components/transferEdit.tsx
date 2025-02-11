import React, {useState} from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/Feather";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation} from '@react-navigation/native';

type Transaction = {
    id: string;
    type: string;
    amount: number;
    status: string;
    date: string;
    time: string;
};

interface TransferEditModalProps {
  visible: boolean;
  onClose: () => void;
  transactionInfo: Transaction;
}

const categories = [
    { label: "Entertainment ", value: "US" },
    { label: "Shopping ", value: "UK" },
    { label: "Transportation ", value: "DE" },
    { label: "Health & Wellness", value: "FR" },
];

const TransferEditModal = ({visible, onClose, transactionInfo }: TransferEditModalProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [transaction, settransaction] = useState(`${transactionInfo.amount}`);
    const [categorie, setCategorie] = useState(transactionInfo.type);
    const [description, setDescription] = useState(transactionInfo.id);

    const handleInputChange = (text : string) => {
        let numericValue = text.replace(/\D/g, "");
        
        if (numericValue === "") {
            settransaction("");
            return;
        }
        let formattedValue = Number(numericValue).toLocaleString();
        settransaction(formattedValue + " VND");
    };

    const handleProceed = () => {
        onClose()
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
                    <Text>{`${transactionInfo.id}`}</Text>
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
            data={categories}
            labelField="label"
            valueField="value"
            placeholder={categorie}
            value={categorie}
            onChange={(item) => setCategorie(item.value)}
            />

            <TouchableOpacity style={styles.proceedButton} onPress={() => {handleProceed()}}>
            <Text style={styles.proceedText}>Proceed</Text>
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
