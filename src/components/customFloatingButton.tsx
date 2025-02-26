import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

const CustomTabButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={styles.floatingButton}
    onPress={onPress}
    activeOpacity={0.7}
  >
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    floatingButton: {
      position: "absolute",
      top: -30,
      width: 80,
      height: 80,
      alignSelf: 'center',
      borderRadius: 30,
      backgroundColor: 'rgba(135, 206, 250, 1)',
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
    },
  });

export default CustomTabButton;
