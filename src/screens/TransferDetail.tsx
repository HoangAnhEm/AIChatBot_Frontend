import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Feather";
import CustomModal from "../components/modal"

const categories = [
  { label: "Entertainment ", value: "US" },
  { label: "Shopping ", value: "UK" },
  { label: "Transportation ", value: "DE" },
  { label: "Health & Wellness", value: "FR" },
];

const TransferDetail = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'TransferDetail'>>();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [transaction, settransaction] = useState("");
  const [categorie, setCategorie] = useState(null);
  const [description, setDescription] = useState("");

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
    if (transaction !== '' && categorie !== '' && description != '')
      navigation.navigate("TransferComplete")
    else
      setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => {navigation.goBack()}}>
        <Ionicons name="arrow-back" size={24} color="green" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.transferContainer}>
            <View style={styles.avatarContainer}>
              <Image source={require("../assets/avatar.png")} style={styles.avatar} />
              <Text>User Name</Text>
            </View>
            <Icon name="repeat" size={24} color="green" />
            <View style={styles.avatarContainer}>
              <Image source={require("../assets/avatar.png")} style={styles.avatar} />
              <Text>{`${route.params.transactionPartner}`}</Text>
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
          placeholder="categorie"
          value={categorie}
          onChange={(item) => setCategorie(item.value)}
        />

        <TouchableOpacity style={styles.proceedButton} onPress={() => {handleProceed()}}>
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      </View>

      {/* Modal hiển thị thông báo */}
      <CustomModal visible={isModalVisible} message="Vui lòng nhập đầy đủ thông tin!" onClose={() => setIsModalVisible(false)} />
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
  },
  transferContainer: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 40, padding: 20,},
  avatarContainer: {flexDirection: "column"},
  avatar: { width: 60, height: 60, borderRadius: 30 },
  
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 40,
    left: 20,
  },
  backText: {
    fontSize: 16,
    color: "green",
    marginLeft: 5,
  },
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

export default TransferDetail;
