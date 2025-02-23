import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import PieChart from 'react-native-pie-chart'
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getTransactions } from "../api/transactionApi";
import Transaction from "../model/Transaction.model";
import {useTransactions} from "../contexts/TransactionsStactisticContext"
import Icons from "react-native-vector-icons/MaterialIcons";


type TransactionsByCategoryAndType = {
  [year: number]: {
    [month: number]: {
      [type: string]: {
        [category: string]: {
          trans: Transaction[];
          total: number;
        };
      };
    };
  };
};


const TransactionStatisticsScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const classfiedTransactions = useTransactions().classfiedTransactions;
    
    const {loadTransaction} = useTransactions();

    const [loading, setLoading] = useState(true);

    const today = new Date();
    const [startDate, setStartDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [selectCategory, setSelectCategory] = useState('Mua sắm');

    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());

    const [type, setType] = useState("Gửi"); 

    const types = ["Nhận", "Gửi"];

    const categories = [
      { name: "Giải trí", color: "#FF5733" },
      { name: "Mua sắm", color: "#33A1FF" },
      { name: "Di chuyển", color: "#FFD700" }, 
      { name: "Sức khỏe", color: "#4CAF50" },
      { name: "Ăn uống", color: "#FF9800" },
      { name: "Hóa đơn", color: "#9C27B0" },
      { name: "Khác", color: "#607D8B" }
    ];
    const getCategoryColor = (categoryName: string) => {
      return categories.find(cat => cat.name === categoryName)?.color || "#000000"; 
    };

    const totalSent = useMemo(() => {
      return Object.values(classfiedTransactions?.[year]?.[month]?.["Gửi"] || {}).reduce(
        (sum, categoryData) => sum + categoryData.total, 
        0
      );
    }, [classfiedTransactions, type]);
    
    const totalReceived = useMemo(() => {
      return Object.values(classfiedTransactions?.[year]?.[month]?.["Nhận"] || {}).reduce(
        (sum, categoryData) => sum + categoryData.total, 
        0
      );
    }, [classfiedTransactions, type]);

    const totalValue = useMemo(() => {
      return type === 'Nhận' ? totalReceived : totalSent;
    }, [classfiedTransactions, type])
    
    const pieData = useMemo(() => {
      if (!classfiedTransactions || ! classfiedTransactions?.[year]?.[month]?.[type]) {
        return [];
      }
      const newPieData = Object.entries( classfiedTransactions?.[year]?.[month]?.[type] || {}).map(([category, info]) => ({
        name: category,
        value: Number(info.total),
        color: getCategoryColor(category),
        percent: totalValue > 0 ? (Number(info.total) / totalValue) * 100 : 0,
      })).sort((a, b) => b.value - a.value);
      return newPieData;
    }, [classfiedTransactions, type]);

    

    const half = Math.ceil(pieData.length / 2 - 1); 
    const firstHalf = pieData.slice(0, half);
    const secondHalf = pieData.slice(half);

    const formatAmount = (amount : number) => {
      let formattedValue = amount.toLocaleString();
      return formattedValue + " VND";
    };
    
    const formatDate = (date: Date) => date ? date.toISOString() : '';
    interface Results {
      year: number;
      month: number;
      type: string;
      category: string;
      trans: Transaction[];
      total: number;
    }
    const fetchTransactionsByTypeAndCategory = async (type: string, category: string) : Promise<Results | undefined>=> {
      if (!classfiedTransactions[year]?.[month]?.[type]?.[category]) {
        // Tiếp tục chạy
      } else if (!(classfiedTransactions[year][month][type][category].trans.length === 0)) {
        return undefined; 
      }
      
      try {
        const data = await getTransactions({
          category: category,
          searchText: '',
          type: type,
          startDate: formatDate(startDate as Date),
          endDate: formatDate(endDate as Date),
          page: 1,
          pageSize: 100,
        });
        const totalValue = data.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0);

        const results = {
          year: year,
          month: month,
          type: type,
          category: category,
          trans: data === undefined ? [] : data,
          total: totalValue === undefined ? 0 : totalValue,
        };
        return results;
      } catch (error) {
        console.error(`Lỗi khi lấy giao dịch phân loại ${type} ${category}:`, error);
      } finally{
        // console.log(`xong giao dịch phân loại ${type} ${category}`);
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        const typePromises = types.flatMap((type) =>
          categories.map((cat) => fetchTransactionsByTypeAndCategory(type, cat.name))
        );
        const typeResults = await Promise.all(typePromises);
        loadTransaction(typeResults);
      } catch (error) {
        console.error("Lỗi khi lấy giao dịch:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    },[startDate, endDate]);

    const handlePrevMonth = () => {
      let newMonth = month - 1;
      let newYear = year;
    
      if (newMonth === 0) {
        newMonth = 12;
        newYear -= 1;
      }
    
      setMonth(newMonth);
      setYear(newYear);
    
      const newStartDate = new Date(newYear, newMonth - 1, 1);
      const newEndDate = new Date(newYear, newMonth, 0);

      setStartDate(newStartDate);
      setEndDate(newEndDate);
    };
    
    const handleNextMonth = () => {
      let newMonth = month + 1;
      let newYear = year;
    
      if (newMonth === 13) {
        newMonth = 1;
        newYear += 1;
      }
    
      setMonth(newMonth);
      setYear(newYear);
    
      const newStartDate = new Date(newYear, newMonth - 1, 1);
      const newEndDate = new Date(newYear, newMonth, 0);
    
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    };
    

      const handleTypeSelect = (type_ : string) => {
        setType(type_);
      };
    

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
                        <TouchableOpacity style={type === "Gửi" ? styles.summaryBoxSelected : styles.summaryBox} onPress={() => {handleTypeSelect("Gửi")}}>
                            <View style = {{flexDirection: 'row', alignSelf: 'flex-start', gap: 5}}>  
                              <Icon name="arrow-up" size={24} color="red" /> 
                              <Text style={styles.summaryTitle}>Chi tiêu</Text>
                            </View>
                            <Text style={styles.amount}>{formatAmount(totalSent)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={type === "Nhận" ? styles.summaryBoxSelected : styles.summaryBox} onPress={() => {handleTypeSelect("Nhận")}}>
                            <View style = {{flexDirection: 'row', alignSelf: 'flex-start', gap: 5}}>
                              <Icon name="arrow-down" size={24} color="green" /> 
                              <Text style={styles.summaryTitle}>Thu nhập</Text>
                            </View>
                            <Text style={styles.amount}>{formatAmount(totalReceived)}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.summaryTextContainer}>
                        <Text style={styles.summaryContainer}> Thu - Chi = 2.588.149đ</Text>
                    </View>
                </View>
                {!loading && totalValue > 0 ? (
                  <View style={styles.PieChartContainer}>
                        {/* Cột 1 */}
                        <View style={[styles.categoryContainer, {marginTop: 30}]}>
                            {firstHalf.map((item, index) => (
                                <View key={index} style={[styles.categoryItem, {alignSelf: "flex-start"}]}>
                                    <Text style={{ color: item.color, fontSize: 18 }}>⬤</Text>
                                    <Text style={styles.categoryText}>{`${item.percent.toFixed(0)}%`}</Text>
                                </View>
                            ))}
                        </View>
                        <PieChart widthAndHeight={widthAndHeight} series={pieData} cover={0.45} padAngle={0.02} />
                        {/* Cột 2 */}
                        <View style={styles.categoryContainer}>
                            {secondHalf.map((item, index) => (
                                <View key={index} style={[styles.categoryItem, {alignSelf: 'flex-end'}]}>
                                    <Text style={styles.categoryText}>{`${item.percent.toFixed(0)}%`}</Text>
                                    <Text style={{ color: item.color, fontSize: 18 }}>⬤</Text>
                                </View>
                            ))}
                        </View>
                  </View>
                  ) : (
                    <View  style={styles.emptyContainer}> 
                      <Icons style={styles.emptyIcon} name="search-off" size={60} color="#888" /> 
                        <Text style={styles.emptyWarnTitle}>No transactions found!</Text>
                        <Text style={styles.emptyWarn}>Try a different month or year.</Text>
                    </View>
                  )
                }
                {/* navigation.navigate("CategoryScreen", {category: item.name, type: type}) */}
                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryTitle}>Category</Text>
                    {!loading && pieData.map((item) => (
                        <TouchableOpacity key={item.name} style={[styles.item]} onPress={() => {
                          // console.log(classfiedTransactions[year][month][type][item.name].trans);
                          navigation.navigate("CategoryScreen", {category: item.name, type: type, year: year, month: month});
                          }}>
                            <View style={styles.leftSection}>
                                <View style={[styles.iconContainer, { backgroundColor: item.color + "20" }]}>
                                    <Icon name="shopping-basket" size={18} color={item.color} />
                                </View>
                                <Text style={styles.text}>{item.name}</Text>
                            </View>
                            <View style={styles.expand}></View>
                            <Text style={styles.value}>
                              {classfiedTransactions?.[year]?.[month]?.[type]?.[item.name]?.total || 0}
                            </Text>
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
    typeContainter: {flexDirection: "row", justifyContent: "space-around", backgroundColor: 'white'},
    summaryTextContainer: {alignSelf: 'center', textAlign: 'center', paddingVertical: 6},
    bodyContainer: {margin: 20, backgroundColor: 'white', borderRadius: 10},
    summaryBox: { width: "49%", backgroundColor: "white", padding: 15, borderRadius: 10, alignItems: "center" },
    summaryBoxSelected: { width: "49%", backgroundColor: "white", padding: 15, borderRadius: 15, alignItems: "center", borderWidth: 2, borderColor: "#d63384"},
    summaryTitle: { fontSize: 16, fontWeight: "bold", alignSelf: 'flex-start'},
    PieChartContainer: { flexDirection: 'row', width: '100%', paddingHorizontal: 10, paddingTop: 30, justifyContent: 'space-around'},
    amount: { fontSize: 20, fontWeight: "bold", marginVertical: 5 , alignSelf: 'flex-start'},
    change: { color: "red" },
    categoryList: {flexDirection: 'row',},
    categoryItem: {flexDirection: "row", backgroundColor: "white", marginBottom: 5, gap: 5},
    categoryText: { fontSize: 16 },
    categoryAmount: { fontWeight: "bold" },
    categoryContainer: {gap: 10, marginTop: 20,},
    categoryCard: {flexDirection: "row", backgroundColor: "white", width: '100%'},
    categoryTitle: {fontWeight: 'bold', fontSize: 19, marginBottom: 10, marginLeft: 10},
    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 15,
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

      emptyContainer: {flex: 1, marginTop: '20%'},
      emptyIcon: {alignSelf: 'center'},
      emptyWarnTitle: {alignSelf: 'center', fontSize: 18, fontWeight: 'bold'},
      emptyWarn: {alignSelf: 'center', fontSize: 16},
});

export default TransactionStatisticsScreen;

