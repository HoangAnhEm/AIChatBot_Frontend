import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/Feather';


interface TimeSelectProps {
  label: string;
  onPress: () => void;
}

const TimeSelect = ({ label, onPress } : TimeSelectProps) => {
  return (
    <TouchableOpacity style={styles.operationButton} onPress={onPress}>
        <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    operationButton: {backgroundColor: 'rgba(103, 111, 227, 0.5)', borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 15 , marginRight: 10},
    text: {color: 'white', fontWeight: 'bold'},
});

export default TimeSelect;
