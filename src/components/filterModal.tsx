import React, { useState, useRef } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"

const FilterModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const hideStartPicker = () => {
    setShowStartPicker(false);
  };

  const handleStartConfirm = (date: Date) => {
    setStartDate(date);
    hideStartPicker();
  };

  const hideEndPicker = () => {
    setShowEndPicker(false);
  };

  const handleEndConfirm = (date: Date) => {
    setEndDate(date);
    hideEndPicker();
  };

  const clearFilter = () => {
    setSelectedCategorie('');
    setSelectedType("Confirmed");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const handleSelectedCategorie = (categorie : string) => {
    if(categorie === selectedCategorie)
      setSelectedCategorie('');
    else
      setSelectedCategorie(categorie);
  }

  const handleSelectedType = (type : string) => {
    if(type === selectedType)
      setSelectedType('');
    else
      setSelectedType(type);
  }

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={clearFilter}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>

          {/* Categorie Selection */}
          <View style={styles.periodContainer}>
            <Text style={styles.sectionTitle}>Categorie</Text>
            <View style={styles.row}>
              {["Shopping", "Entertainment", "Transportation", "Health & Wellness"].map((Categorie) => (
                <TouchableOpacity
                  key={Categorie}
                  style={[styles.filterButton, selectedCategorie === Categorie && styles.selected]}
                  onPress={() => handleSelectedCategorie(Categorie)}
                >
                  <Text style={[styles.filterText, selectedCategorie === Categorie && styles.selectedText]}>{Categorie}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Period Selection */}
          <View style={styles.periodContainer}>
            <Text style={styles.sectionTitle}>Select period</Text>
            <View style={styles.datePickerRow}>
              <TouchableOpacity style={styles.filterButton} onPress={() => setShowStartPicker(true)}>
                <Text style={styles.dateText}>📅 {startDate.toLocaleDateString("vi-VN")}</Text>
              </TouchableOpacity>
              <Text style={styles.toText}> - </Text>
              <TouchableOpacity style={styles.filterButton} onPress={() => setShowEndPicker(true)}>
                <Text style={styles.dateText}>📅 {endDate.toLocaleDateString("vi-VN")}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Date Picker Modals */}
          <DateTimePickerModal
            isVisible={showStartPicker}
            mode="date"
            onConfirm={handleStartConfirm}
            onCancel={hideStartPicker}
          />
          <DateTimePickerModal
            isVisible={showEndPicker}
            mode="date"
            onConfirm={handleEndConfirm}
            onCancel={hideEndPicker}
          />

          {/* Type Selection */}
          <View style={styles.periodContainer}>
            <Text style={styles.sectionTitle}>Type</Text>
            <View style={styles.rowBottom}>
              {["Processing", "Send", "Get"].map((Type) => (
                <TouchableOpacity
                  key={Type}
                  style={[styles.typeButton, selectedType === Type && styles.selected]}
                  onPress={() => handleSelectedType(Type)}
                >
                  <Text style={[styles.filterText, selectedType === Type && styles.selectedText]}>{Type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Show Results Button */}
          <TouchableOpacity style={styles.showResultsButton} onPress={onClose}>
            <Text style={styles.showResultsText}>Show results</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Nền mờ
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%", 
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
  },
  header: { flexDirection: "row", justifyContent: "space-between", width: "100%", 
   paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(95, 99, 95, 0.15)'},
  periodContainer: {paddingHorizontal: 20, marginTop: 10, width: '100%'},
  title: { fontSize: 16, fontWeight: "bold" },
  clearText: {fontSize: 16, fontWeight: "bold", color: "#87CEFA"},
  sectionTitle: { fontSize: 16, fontWeight: "bold", alignSelf: "flex-start"},
  row: { flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start"},
  rowBottom: { flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-evenly'},
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: 'rgba(65, 68, 65, 0.15)',
    margin: 5,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: 'rgba(65, 68, 65, 0.15)',
    margin: 5,
  },
  selected: { backgroundColor: "#87CEFA" },
  filterText: { fontSize: 14 },
  selectedText: { color: "white" },
  datePickerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  // datePicker: {
  //   backgroundColor: "#f0f0f0",
  //   paddingVertical: 8,
  //   paddingHorizontal: 15,
  //   borderRadius: 8,
  // },
  dateText: { fontSize: 14 },
  toText: { fontSize: 18, marginHorizontal: 10 },
  showResultsButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: "center",
    width: "80%",
    marginVertical: 20,
  },
  showResultsText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default FilterModal;
