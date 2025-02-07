import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/Feather';


interface FeatureButtonProps {
  label: string;
  icon: string;
  onPress: () => void;
}

const FeatureButton = ({ label, icon, onPress } : FeatureButtonProps) => {
  return (
    <TouchableOpacity style={styles.operationButton} onPress={onPress}>
        <Icon name={icon} size={24} color="#555" />
        <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    operationButton: { width: 60, height: 60, backgroundColor: '#EDEDED', borderRadius: 10, alignItems: 'center', justifyContent: 'center', padding: 2, gap: 5},

});

export default FeatureButton;
