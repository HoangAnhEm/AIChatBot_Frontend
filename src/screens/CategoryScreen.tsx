import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const CategoryScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Tất cả");

  const transactions = [
    { id: 1, date: "21/2/2025", name: "Chuyển tiền đến TRAN MANH KHAI (BIDV)", amount: -1000000 },
    { id: 2, date: "19/2/2025", name: "Chuyển tiền đến NGUYEN DUY HAI LONG (TPBank)", amount: -50000 },
  ];

  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <View style={styles.header}>
        <Text style={styles.title}>Giải trí</Text>
        <Icon name="car" size={20} color="#555" />
      </View>

      {/* Biểu đồ */}
      <View style={styles.chartContainer}>
        <View style={styles.tabRow}>
          <TouchableOpacity style={[styles.tab, { backgroundColor: "#eee" }]}>
            <Text>Theo tuần</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, { backgroundColor: "#d63384" }]}>
            <Text style={{ color: "#fff" }}>Theo tháng</Text>
          </TouchableOpacity>
        </View>

        <BarChart
          data={{
            labels: ["9", "10", "11", "1/2025", "2"],
            datasets: [{ data: [298000, 400000, 600000, 800000, 1687999] }],
          }}
          width={width - 40}
          height={200}
          yAxisLabel=""
          yAxisSuffix="đ" // Thêm dòng này để sửa lỗi
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(214, 51, 132, ${opacity})`,
            labelColor: () => "#333",
            style: { borderRadius: 16 },
          }}
          style={{ borderRadius: 16 }}
        />

        <Text style={styles.alertText}>
          🔆 Chi phí cho mục này đang <Text style={{ fontWeight: "bold", color: "orange" }}>cao hơn trung bình</Text> của{" "}
          <Text style={{ fontWeight: "bold" }}>5 tháng trước</Text>. Bạn có muốn lập ngân sách chi tiêu?
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.grayButton]}>
            <Text>Để sau</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.pinkButton]}>
            <Text style={{ color: "#fff" }}>Lập ngân sách</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Danh sách giao dịch */}
      <View style={styles.transactionContainer}>
        <Text style={styles.sectionTitle}>Giao dịch tháng 2</Text>
        <View style={styles.tabRow}>
          {["Tất cả", "Top chi tiêu", "Top người nhận"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={selectedTab === tab ? styles.activeText : styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.transactionDate}>{item.date}</Text>
              <Text style={styles.transactionName}>{item.name}</Text>
              <Text style={styles.transactionAmount}>{item.amount.toLocaleString()}đ</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#d63384",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tabText: {
    color: "#333",
  },
  alertText: {
    fontSize: 14,
    color: "#333",
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginHorizontal: 5,
  },
  grayButton: {
    backgroundColor: "#eee",
  },
  pinkButton: {
    backgroundColor: "#d63384",
  },
  transactionContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionItem: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
  },
  transactionDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "500",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    textAlign: "right",
  },
});

export default CategoryScreen;
