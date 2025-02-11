import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface CustomModalProps {
    visible: boolean;
    message: string;
    onClose: () => void;
  }
  
const CustomModal = ({ visible, message, onClose }: CustomModalProps) => {
  return (
    <Modal animationType="none" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" },
  modalText: { fontSize: 16, marginBottom: 10 },
  modalButton: { backgroundColor: "#4a90e2", padding: 10, borderRadius: 5 },
  modalButtonText: { color: "white", fontSize: 16 },
});

export default CustomModal;
