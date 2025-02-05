import { SafeAreaView, View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>Hello, world!</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer with marginBottom</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    padding: 10,
    backgroundColor: "#ccc",
    marginBottom: 20, // Margin bottom
  },
  footerText: {
    fontSize: 16,
  },
});
