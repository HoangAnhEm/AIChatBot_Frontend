import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";

const MovingDot = () => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const moveDot = () => {
      translateX.setValue(0);
      Animated.timing(translateX, {
        toValue: 300, // Chiều dài đường chạy của chấm
        duration: 1000, // Thời gian chạy hết đường
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => moveDot()); // Lặp vô hạn
    };
    moveDot();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Animated.View style={[styles.dot, { transform: [{ translateX }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 10,
    justifyContent: "center",
    overflow: "hidden",
  },
  line: {
    width: "100%",
    height: 2,
    backgroundColor: "white",
    position: "absolute",
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "black",
    borderRadius: 5,
    position: "absolute",
  },
});

export default MovingDot;
