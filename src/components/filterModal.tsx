import React, { useState, useRef, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"

interface FilterModalProps {
  isVisible: boolean,
  category: string,
  type: string,
  startDate_: Date | undefined,
  endDate_: Date | undefined,
  close: () => void,
  confirm: (
    category: string,
    type: string,
    startDate_: Date | undefined,
    endDate_: Date | undefined,
  ) => void
}

const FilterModal = ({ isVisible, category, type, startDate_, endDate_, confirm, close}: FilterModalProps) => {
  const [isTimeRangeValid, setIsTimeRangeValid] = useState(true);

  const [selectedCategorie, setSelectedCategorie] = useState(category);
  const [selectedType, setSelectedType] = useState(type);

  const [startDate, setStartDate] = useState<Date | undefined>(startDate_);
  const [endDate, setEndDate] = useState<Date | undefined>(endDate_);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    setStartDate(startDate_);
  }, [startDate_]);
  
  useEffect(() => {
    setEndDate(endDate_);
  }, [endDate_]);

  const hideStartPicker = () => {
    setShowStartPicker(false);
  };

  const handleStartConfirm = (date: Date) => {
    hideStartPicker();
    setStartDate(date);
  };

  const hideEndPicker = () => {
    setShowEndPicker(false);
  };

  const handleEndConfirm = (date: Date) => {
    hideEndPicker();
    setEndDate(date);
  };

  const clearFilter = () => {
    setSelectedCategorie('');
    setSelectedType("");
    setStartDate(undefined);
    setEndDate(undefined);
    setIsTimeRangeValid(true)
  };
  const categories = [
    { label: "Entertainment ", value: "Giải trí" },
    { label: "Shopping ", value: "Mua sắm" },
    { label: "Transportation ", value: "Di chuyển" },
    { label: "Health & Wellness", value: "Sức khỏe" },
  ];

  const getCategoryValue = (label: string) => {
    const category = categories.find(cat => cat.label.trim() === label.trim());
    return category ? category.value : '';
  };

  const types = [
    { label: "Processing ", value: "Xử lý" },
    { label: "Send ", value: "Gửi" },
    { label: "Get ", value: "Nhận" },
  ];

  const getTypeValue = (label: string) => {
    const type = types.find(type => type.label.trim() === label.trim());
    return type ? type.value : '';
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

  const confirm_close = () => {
    const categorie_V = getCategoryValue(selectedCategorie);
    const type_V = getTypeValue(selectedType);
    confirm(categorie_V, type_V, startDate, endDate)
    setIsTimeRangeValid(true)
    close()
  }

  const handleConfirm = () => {
    if (startDate && endDate){
      if (startDate.getTime() < endDate.getTime()) {
        confirm_close()
        return
      }
    }
    else{
      confirm_close()
      return
    }
    setIsTimeRangeValid(false)
  }

  return (
    <Modal visible={isVisible} transparent animationType="fade">
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
                <Text style={styles.dateText}>📅 {startDate === undefined ? 'From' : startDate.toLocaleDateString("vi-VN")}</Text>
              </TouchableOpacity>
              <Text style={styles.toText}> - </Text>
              <TouchableOpacity style={styles.filterButton} onPress={() => setShowEndPicker(true)}>
                <Text style={styles.dateText}>📅 {endDate === undefined ? 'To' : endDate.toLocaleDateString("vi-VN")}</Text>
              </TouchableOpacity>
            </View>

            {!isTimeRangeValid && <Text style={styles.warning}> Invalid Period!! </Text>}
          </View>

          {/* Date Picker Modals */}
          <DateTimePickerModal
            isVisible={showStartPicker}
            mode="date"
            date={startDate}
            onConfirm={handleStartConfirm}
            onCancel={hideStartPicker}
          />
          <DateTimePickerModal
            isVisible={showEndPicker}
            mode="date"
            date={endDate}
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
          <TouchableOpacity style={styles.showResultsButton} onPress={handleConfirm}>
            <Text style={styles.showResultsText}>Show results</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.showCancelButton} onPress={close}>
            <Text style={styles.showCancelText}>Cancel</Text>
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
  warning: {color: 'red', alignItems: 'center', alignSelf: 'center'},
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
    marginTop: 20,
  },
  showResultsText: { color: "white", fontSize: 16, fontWeight: "bold" },

  showCancelButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
    marginTop: 10
  },
  showCancelText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default FilterModal;
