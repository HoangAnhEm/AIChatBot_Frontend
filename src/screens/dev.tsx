import React from "react";
import { ScrollView, View, StyleSheet,Text } from "react-native";
import TimeSelect from "../components/timeSelectButton"; // Import component TimeSelect đã tạo
import BottomTabNavigator from "../components/bottomNaviagtor"

const DevScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text> aisdhaksdjaksd </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContainer}
      >
        <TimeSelect label="This Week" onPress={() => {}} />
        <TimeSelect label="Last Week" onPress={() => {}} />
        <TimeSelect label="Last Month" onPress={() => {}} />
        <TimeSelect label="Last Year" onPress={() => {}} />
        <TimeSelect label="All Time" onPress={() => {}} />
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    width: 300, height: 300,
    flexDirection: "row", // Xếp các item theo hàng ngang
    paddingVertical: 10,
  },
});

export default DevScreen;
