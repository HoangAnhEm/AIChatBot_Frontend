import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import PieChart from 'react-native-pie-chart'

const ExpenseManagement = () => {
    const data = [
        { name: "Nhà cửa", value: 4393000, color: "#7b6ef6", legendFontColor: "#7F7F7F" },
        { name: "Trả nợ", value: 4220750, color: "#f6b26e", legendFontColor: "#7F7F7F" },
        { name: "Sửa chữa/Bảo dưỡng", value: 3805500, color: "#6edfa6", legendFontColor: "#7F7F7F" },
        { name: "Chợ, siêu thị", value: 3359334, color: "#f69c6e", legendFontColor: "#7F7F7F" },
    ];

    const widthAndHeight = 250

    const series = [
      { value: 430, color: '#fbd203' },
      { value: 321, color: '#ffb300' },
      { value: 185, color: '#ff9100' },
      { value: 123, color: '#ff6c00' },
    ]


    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text style={styles.headerTitle}>Quản lý chi tiêu</Text>
                <MaterialIcons name="more-horiz" size={24} color="white" />
            </View>
            
            <View style={styles.summaryContainer}>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryTitle}>Chi tiêu</Text>
                    <Text style={styles.amount}>26.852.574đ</Text>
                    <Text style={styles.change}>▲ 3.874.137đ cùng kỳ</Text>
                </View>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryTitle}>Thu nhập</Text>
                    <Text style={styles.amount}>3.928.857đ</Text>
                    <Text style={styles.change}>▲ 2.588.149đ cùng kỳ</Text>
                </View>
            </View>
            <PieChart widthAndHeight={widthAndHeight} series={data} cover={0.45} padAngle={0.02}/>

            <View style={styles.categoryList}>
                {data.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.categoryItem}>
                        <Text style={{ color: item.color, fontSize: 18 }}>⬤</Text>
                        <Text style={styles.categoryText}>{item.name}</Text>
                        <Text style={styles.categoryAmount}>{item.value.toLocaleString()}đ</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },
    header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#d63384", padding: 15 },
    headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
    summaryContainer: { flexDirection: "row", justifyContent: "space-around", padding: 15 },
    summaryBox: { backgroundColor: "#fff", padding: 15, borderRadius: 10, alignItems: "center" },
    summaryTitle: { fontSize: 16, fontWeight: "bold" },
    amount: { fontSize: 20, fontWeight: "bold", marginVertical: 5 },
    change: { color: "red" },
    categoryList: { marginTop: 20 },
    categoryItem: { flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "white", marginBottom: 5, borderRadius: 10 },
    categoryText: { fontSize: 16 },
    categoryAmount: { fontWeight: "bold" },
});

export default ExpenseManagement;

