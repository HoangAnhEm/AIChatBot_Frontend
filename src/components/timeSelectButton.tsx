import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/Feather';


interface TimeSelectProps {
  label: string;
  isSelected: boolean,
  onPress: (period : string) => boolean;
}

const TimeSelect = ({ label, onPress, isSelected } : TimeSelectProps) => {
  // const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    onPress(label);
  }

  return (
    <TouchableOpacity style={isSelected === true ? styles.operationButton_selected : styles.operationButton} onPress={handleSelect}>
        <Text style={isSelected === true ? styles.text_selected : styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    operationButton_selected: {backgroundColor: 'rgba(103, 111, 227, 0.5)', borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 15 , marginRight: 10},
    text_selected: {color: 'white', fontWeight: 'bold'},

    operationButton: {backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 15 , marginRight: 10},
    text: {color: 'black', fontWeight: 'bold'},
});

export default TimeSelect;
