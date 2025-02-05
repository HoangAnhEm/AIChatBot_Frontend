import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Feather";

const countries = [
  { label: "Entertainment ", value: "US" },
  { label: "Shopping ", value: "UK" },
  { label: "Transportation ", value: "DE" },
  { label: "Health & Wellness", value: "FR" },
];

const PaymentScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [transaction, settransaction] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [iban, setIban] = useState("");

  const handleInputChange = (text : string) => {
        let numericValue = text.replace(/\D/g, "");
        
        if (numericValue === "") {
            settransaction("");
            return;
        }
        let formattedValue = Number(numericValue).toLocaleString();
        settransaction(formattedValue + " VND");
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => {navigation.goBack()}}>
        <Ionicons name="arrow-back" size={24} color="green" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.transferContainer}>
            <Image source={require("../assets/avatar.png")} style={styles.avatar} />
            <Icon name="repeat" size={24} color="green" />
            <Image source={require("../assets/avatar.png")} style={styles.avatar} />
        </View>
        <Text style={styles.title}>Enter transaction details</Text>

        <TextInput
            style={styles.input}
            placeholder="Transaction amount"
            keyboardType="phone-pad" 
            value={transaction}
            onChangeText={handleInputChange}
        />

        <Dropdown
          style={styles.dropdown}
          data={countries}
          labelField="label"
          valueField="value"
          placeholder="Categories"
          value={selectedCountry}
          onChange={(item) => setSelectedCountry(item.value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={iban}
          onChangeText={setIban}
        />

        <TouchableOpacity style={styles.proceedButton} onPress={() => {navigation.navigate("TransferComplete")}}>
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
  },
  transferContainer: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 40, padding: 20,},
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

export default PaymentScreen;
