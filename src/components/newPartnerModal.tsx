import React, {useState} from "react";
import { Modal, View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";

interface NewPartnerModalProps {
    visible: boolean;
    onClose: () => void;
    check: (name: string) => boolean;
    save: (name: string) => void;
}


  
const NewPartnerModal = ({ visible, onClose, check, save}: NewPartnerModalProps) => {
  const [partnerName, setPartnerName] = useState('');
  const [isValid, setisValid] = useState(false);

  const confirmHandle = () => {
    if(check(partnerName))
      setisValid(true)

    else{
      onClose();
      setisValid(false)
      setPartnerName('');
      save(partnerName);
    }
  };

  return (
    <Modal animationType="none" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>New Partner</Text>
          <View style={styles.partnerContent}>
            <Image source={require("../assets/avatar.png")} style={styles.transactionAvatar} />
            <TextInput
            style={styles.input}
            placeholder="Partner Name"
            value={partnerName}
            onChangeText={setPartnerName}
            />     
          </View>
          {isValid && <Text style={styles.warning} >Partner Name is already exist!!</Text>}
          <View style={styles.buttonContainer} >
            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={() => {confirmHandle()}}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  partnerContent: {justifyContent: "center", alignItems: "center", flexDirection: 'row', marginVertical: 10},
  input: {
    // width: "100%",
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 12,
    borderRadius: 8,
    // marginBottom: 15,
  },
  title: { fontSize: 16, fontWeight: "bold", alignSelf: 'flex-start'},
  warning: {fontSize: 12, color: 'red'},
  transactionAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  modalContent: { backgroundColor: "white", width: '70%', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, alignItems: "center" },
  modalText: { fontSize: 16, marginBottom: 10 },
  buttonContainer: {width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginTop: 10},
  modalButton: { backgroundColor: "#4a90e2", paddingVertical: 3, paddingHorizontal: 20, borderRadius: 5 },
  modalButtonText: { color: "white", fontSize: 16 },
});

export default NewPartnerModal;
