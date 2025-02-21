import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import PieChart from 'react-native-pie-chart'
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getTransactions } from "../api/transactionApi";
import Transaction from "../model/Transaction.model";

const TransactionStatisticsScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(true);

    const [income, setIncome] = useState(0); 
    const [outcome, setOutcome] = useState(11); 

    const today = new Date();
    const [startDate, setStartDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [selectCategory, setSelectCategory] = useState('Mua sắm');

    const [month, setMonth] = useState(11); 
    const [year, setYear] = useState(2024); 

    const [type, setType] = useState("Nhận"); 

    const [transactionsByCategory, setTransactionsByCategory] = useState<{ [key: string]: Transaction[] }>({});



    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const data = await getTransactions({
            category: '',
            searchText: '',
            type: type,
            startDate: startDate,
            endDate: endDate,
            page: '',
            pageSize: '',
          });
          const transactions: Transaction[] = data;

          const groupedTransactions: { [key: string]: Transaction[] } = {};
          transactions.forEach((transaction) => {
            if (!groupedTransactions[transaction.category]) {
              groupedTransactions[transaction.category] = [];
            }
            groupedTransactions[transaction.category].push(transaction);
          });
  
          setTransactionsByCategory(groupedTransactions);
        } catch (error) {
          console.error("Lỗi khi lấy giao dịch:", error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    },[startDate, endDate]);

    const handlePrevMonth = () => {
        if (month === 1) {
          setMonth(12);
          setYear(year - 1);
        } else {
          setMonth(month - 1);
        }
      };
    
      const handleNextMonth = () => {
        if (month === 12) {
          setMonth(1);
          setYear(year + 1);
        } else {
          setMonth(month + 1);
        }
      };

      const handleTypeSelect = (type_ : string) => {
        setType(type_);
      };
    
    const data = [
        { name: "Nhà cửa", value: 4393000, color: "#7b6ef6", legendFontColor: "#7F7F7F" },
        { name: "Trả nợ", value: 4220750, color: "#f6b26e", legendFontColor: "#7F7F7F" },
        { name: "Sửa chữag", value: 3805500, color: "#6edfa6", legendFontColor: "#7F7F7F" },
        { name: "Chợ", value: 3359334, color: "#f69c6e", legendFontColor: "#7F7F7F" },
    ];

    const widthAndHeight = 170


    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Quản lý chi tiêu</Text>
                <MaterialIcons name="more-horiz" size={24} color="white" />
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.timeContainer}>
                    <TouchableOpacity onPress={handlePrevMonth} style={styles.button}>
                        <Icon name="chevron-left" size={16} color="#555" />
                    </TouchableOpacity>

                    <View style={styles.dateContainer}>
                        <Icon name="calendar" size={16} color="#555" style={{ marginRight: 5 }} />
                        <Text style={styles.dateText}>Tháng {month}/{year}</Text>
                    </View>

                    <TouchableOpacity onPress={handleNextMonth} style={styles.button}>
                        <Icon name="chevron-right" size={16} color="#555" />
                    </TouchableOpacity>
                </View>
                <View style={styles.summaryContainer}>
                    <View style={styles.typeContainter}>
                        <TouchableOpacity style={type === "Nhận" ? styles.summaryBoxSelected : styles.summaryBox} onPress={() => {handleTypeSelect("Nhận")}}>
                            <Text style={styles.summaryTitle}>Chi tiêu</Text>
                            <Text style={styles.amount}>26.852.574đ</Text>
                            <Text style={styles.change}>▲ 3.874.137đ cùng kỳ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={type === "Gửi" ? styles.summaryBoxSelected : styles.summaryBox} onPress={() => {handleTypeSelect("Gửi")}}>
                            <Text style={styles.summaryTitle}>Thu nhập</Text>
                            <Text style={styles.amount}>3.928.857đ</Text>
                            <Text style={styles.change}>▲ 2.588.149đ cùng kỳ</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.summaryTextContainer}>
                        <Text style={styles.summaryContainer}> Thu - Chi = 2.588.149đ</Text>
                    </View>
                </View>

                <View style={styles.PieChartContainer}>
                    <PieChart widthAndHeight={widthAndHeight} series={data} cover={0.45} padAngle={0.02}/>
                    <View style={styles.categoryList}>
                    {data.map((item, index) => (
                        <View key={index} style={styles.categoryItem}>
                            <Text style={{ color: item.color, fontSize: 18 }}>⬤</Text>
                            <Text style={styles.categoryText}>{item.name}</Text>
                        </View>
                    ))}
                    </View>
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryTitle}>Category</Text>
                    {data.map((item) => (
                        <TouchableOpacity key={item.value.toString()} style={[styles.item]} onPress={() => {navigation.navigate("CategoryScreen")}}>
                            <View style={styles.leftSection}>
                                <View style={[styles.iconContainer, { backgroundColor: item.color + "20" }]}>
                                    <Icon name="shopping-basket" size={18} color={item.color} />
                                </View>
                                <Text style={styles.text}>{item.name}</Text>
                            </View>
                            <View style={styles.expand}></View>
                            <Text style={styles.value}>{item.value}</Text>
                            <Icon name="chevron-right" size={14} color="#999" />
                        </TouchableOpacity>
                    ))}

                    <View style={styles.gap}></View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "rgb(236, 238, 243)"},
    header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#d63384", padding: 15, paddingTop: 40},
    headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
    summaryContainer: { borderRadius: 15, marginHorizontal: 10, borderWidth: 1, borderColor: "rgb(220, 211, 211)",  backgroundColor: "rgb(233, 227, 227)"},
    typeContainter: {flexDirection: "row", justifyContent: "space-around",},
    summaryTextContainer: {alignSelf: 'center', textAlign: 'center', paddingVertical: 6},
    bodyContainer: {margin: 20, backgroundColor: 'white', borderRadius: 10},
    summaryBox: { backgroundColor: "white", padding: 15, borderRadius: 10, alignItems: "center" },
    summaryBoxSelected: { backgroundColor: "white", padding: 15, borderRadius: 15, alignItems: "center", borderWidth: 2, borderColor: "#d63384"},
    summaryTitle: { fontSize: 16, fontWeight: "bold" },
    PieChartContainer: { flexDirection: 'row', paddingHorizontal: 20 ,paddingTop: 30},
    amount: { fontSize: 20, fontWeight: "bold", marginVertical: 5 },
    change: { color: "red" },
    categoryList: {gap: 10, marginLeft: 40},
    categoryItem: {flexDirection: "row", backgroundColor: "white", marginBottom: 5, borderRadius: 10 },
    categoryText: { fontSize: 16 },
    categoryAmount: { fontWeight: "bold" },
    categoryContainer: {paddingHorizontal: 10, marginTop: 20},
    categoryCard: {flexDirection: "row", backgroundColor: "white", width: '100%'},
    categoryTitle: {fontWeight: 'bold', fontSize: 19, marginBottom: 10},
    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 15,
        // borderRadius: 10,
        // shadowColor: "#000",
        // shadowOpacity: 0.1,
        // shadowRadius: 5,
        // elevation: 3,
      },
      button: {
        padding: 8,
      },
      dateContainer: {
        flexDirection: "row",
        alignItems: "center",
      },
      dateText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
      },
      expand: {flex: 1},
      gap: {height: 100},
      item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgb(191, 194, 204)",
        marginVertical: 6,
        backgroundColor: "#fff",
      },
      selectedItem: {
        borderWidth: 1,
        borderColor: "#d63384",
      },
      leftSection: {
        flexDirection: "row",
        alignItems: "center",
      },
      iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
      },
      text: {
        fontSize: 16,
        color: "#333",
      },
      value: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginRight: 8,
      },
});

export default TransactionStatisticsScreen;

