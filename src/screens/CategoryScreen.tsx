import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useTransactions } from "../contexts/TransactionsStactisticContext";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import Transaction from "../model/Transaction.model";
import { getTransactions, updateTransaction } from "../api/transactionApi";
import TransferEditModal from "../components/transferEditModal";

const { width } = Dimensions.get("window");

const CategoryScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CategoryScreen'>>();
  const classfiedTransactions = useTransactions().classfiedTransactions;
  const {loadTransaction} = useTransactions();
  const {updateTransactions} = useTransactions();

  const {category, type, year, month} = route.params;

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedTransIndex, setSelectedTransIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Tất cả");

  const barChartData = useMemo(() => {
    if (!classfiedTransactions || !year || !month) return { labels: [], datasets: [{ data: [] }] };
  
    const monthsData = Array.from({ length: 5 }, (_, i) => {
      const month_ = month - i;
      const year_ = year - (month_ <= 0 ? 1 : 0);
      const adjustedMonth = month_ <= 0 ? month_ + 12 : month_; 
  
      const total = classfiedTransactions?.[year_]?.[adjustedMonth]?.[type]?.[category]?.total ?? 0;
      return {
        month: `${adjustedMonth}/${year_}`,
        total: total
      };
    }).reverse();
    const results = {
      labels: monthsData.map((d) => d.month),
      datasets: [{ data: monthsData.map((d) => d.total) }]
    }

    return results;
  }, [classfiedTransactions]);
  
  
  const formatDate = (date: Date) => date ? date.toISOString() : '';
    interface Results {
      year: number;
      month: number;
      type: string;
      category: string;
      trans: Transaction[];
      total: number;
    }
    const fetchTransactionsByTypeAndCategory = async (type: string, category: string, year: number, month: number) : Promise<Results | undefined>=> {
      if (!classfiedTransactions[year]?.[month]?.[type]?.[category]) {
        // Tiếp tục chạy
      } else if (!(classfiedTransactions[year][month][type][category].trans.length === 0)) {
        return undefined; 
      }

      const StartDate = new Date(year, month - 1, 1);
      const EndDate = new Date(year, month, 0);
      
      try {
        const data = await getTransactions({
          category: category,
          searchText: '',
          type: type,
          startDate: formatDate(StartDate as Date),
          endDate: formatDate(EndDate as Date),
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
        // console.log(`xong giao dịch phân loại ${type} ${category} vao tgain ${month} / ${year}`);
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);

        const typePromises = Array.from({ length: 5 }, (_, i) => {
          const month_ = month - i;
          const year_ = year - (month_ <= 0 ? 1 : 0);
          const adjustedMonth = month_ <= 0 ? month_ + 12 : month_; 

          return fetchTransactionsByTypeAndCategory(type, category, year_, adjustedMonth);
        });
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
    },[]);


    const handleTransUpdate = async(category_: string, description_: string, amount_: number) => {
      const res = await updateTransaction({
        expenseId: classfiedTransactions[year][month][type][category].trans[selectedTransIndex].id,
        updateData: {
          amount: amount_, 
          description: description_, 
          category: category_
        },
      })
    
      if (!res)
        return
    
    
      updateTransactions(
        year,
        month,
        type,
        category,
        category_,
        selectedTransIndex,
        amount_,
        description_
      )
    };

  return (
    <View style={styles.container} >
      {/* Tiêu đề */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{category}</Text>
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
          data={barChartData}
          width={width - 60}
          height={200}
          yAxisLabel=""
          // yLabelsOffset={9999} 
          yAxisSuffix="đ" 
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(214, 51, 132, ${opacity})`,
            labelColor: () => "#333",
            style: { borderRadius: 16, position: 'relative', left: -20},
          }}
          style={{ borderRadius: 16}}
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
        <Text style={styles.sectionTitle}>{`Giao dịch tháng ${month}`}</Text>
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
        
        {<FlatList
          data={classfiedTransactions[year]?.[month]?.[type]?.[category]?.trans ?? []}
          keyExtractor={(_, index) => index.toString()} 
          renderItem={({ item , index}) => (
            <TouchableOpacity style={styles.transactionItem} onPress={() => {setSelectedTransIndex(index), setEditModalVisible(true)}}>
              <Text style={styles.transactionDate}>{item.createdAt.toISOString()}</Text>
              <Text style={styles.transactionName}>{item.description}</Text>
              <Text style={styles.transactionAmount}>{item.amount.toLocaleString()}đ</Text>
            </TouchableOpacity>
          )}
        />}
      </View>

      {!loading && <TransferEditModal key={selectedTransIndex} visible={isEditModalVisible} updateConfirm={handleTransUpdate} 
                                      transactionInfo={classfiedTransactions[year]?.[month]?.[type]?.[category]?.trans[selectedTransIndex] ?? undefined} 
                                      close={() => setEditModalVisible(false)}/>}
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
    alignItems: "center",
    gap: 5,
    marginTop: 30,
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
    flex: 1,
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
