import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const TransferComplete = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="green" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Card */}
      <View style={styles.card}>
        <Ionicons name="checkmark-circle" size={80} color="#2ECC71" />
        <Text style={styles.successText}>Payment successful!</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backHomeButton}>
            <Text style={styles.backHomeText}>Back to home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.newPaymentButton}>
            <Text style={styles.newPaymentText}>New payment</Text>
          </TouchableOpacity>
        </View>
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
    padding: 30,
    borderRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  backHomeButton: {
    borderColor: "#5D9CEC",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  backHomeText: {
    color: "#5D9CEC",
    fontSize: 14,
    fontWeight: "bold",
  },
  newPaymentButton: {
    backgroundColor: "#5D9CEC",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  newPaymentText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default TransferComplete;
