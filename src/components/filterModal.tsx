import React, { useState, useRef } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"

const FilterModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const [selectedCategorie, setSelectedCategorie] = useState("Shopping");
  const [selectedPeriod, setSelectedPeriod] = useState("This week");
  const [selectedStatus, setSelectedStatus] = useState("Confirmed");

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
    setSelectedPeriod("This week");
    setSelectedStatus("Confirmed");
    setStartDate(new Date());
    setEndDate(new Date());
  };

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
                  onPress={() => setSelectedCategorie(Categorie)}
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

          {/* Status Selection */}
          <View style={styles.periodContainer}>
            <Text style={styles.sectionTitle}>Status</Text>
            <View style={styles.row}>
              {["Confirmed", "Pending", "Canceled"].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[styles.filterButton, selectedStatus === status && styles.selected]}
                  onPress={() => setSelectedStatus(status)}
                >
                  <Text style={[styles.filterText, selectedStatus === status && styles.selectedText]}>{status}</Text>
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
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
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
