import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";

const MyScreen = () => {
  const [inputValue, setInputValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleProceed = () => {
    if (!inputValue) {
      setIsModalVisible(true); // Hiển thị modal nếu thiếu thông tin
    } else {
      console.log("Tiếp tục xử lý...");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nhập thông tin:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập nội dung..."
        value={inputValue}
        onChangeText={setInputValue}
      />

      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>

      {/* Modal hiển thị thông báo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Vui lòng nhập đầy đủ thông tin!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: { width: "100%", padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 20 },
  button: { backgroundColor: "#4a90e2", padding: 10, borderRadius: 5 },
  buttonText: { color: "white", fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" },
  modalText: { fontSize: 16, marginBottom: 10 },
  modalButton: { backgroundColor: "#4a90e2", padding: 10, borderRadius: 5 },
  modalButtonText: { color: "white", fontSize: 16 },
});

export default MyScreen;
