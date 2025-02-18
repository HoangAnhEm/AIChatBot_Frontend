import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import TransactionItem from "../components/transactionItem";
import Icon from "react-native-vector-icons/Feather";
import Icons from "react-native-vector-icons/MaterialIcons"; 
import IconFA from 'react-native-vector-icons/FontAwesome';

import TimeSelect from "../components/timeSelectButton"
import FilterModal from "../components/filterModal";
import TransferEditModal from "../components/transferEditModal";
import {getTransactions, updateTransaction} from "../api/transactionApi"
import Transaction from "../model/Transaction.model";
import SearchBar from "../components/searchBar"



const wallets = [
    { label: "💳  Wallet number 1"},
    { label: "💳  Wallet number 2"},
    { label: "💳  Wallet number 3"},
  ];
  

const TransactionsScreen = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransIndex, setSelectedTransIndex] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('');

  const [category, setCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);



const formatDate = (date: Date) => date ? date.toISOString() : '';

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getTransactions({
        category: category,
        searchText: searchText,
        type: type,
        startDate: startDate === undefined ? '' : formatDate(startDate as Date),
        endDate: endDate === undefined ? '' : formatDate(endDate as Date),
        page: page,
        pageSize: pageSize,
      });
      setTransactions(data);
    } catch (error) {
      console.error("Lỗi khi lấy giao dịch:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
},[category, searchText, type, startDate, endDate, page, pageSize]);


const applyTimeRange = async (timeRange : string) => {
  let startDate, endDate;
  const today = new Date();

  switch (timeRange) {
    case "This Week":
      startDate = new Date(today.setDate(today.getDate() - today.getDay()));
      endDate = new Date();
      break;
    case "Last Week":
      startDate = new Date(today.setDate(today.getDate() - today.getDay() - 7));
      endDate = new Date(today.setDate(today.getDate() + 6));
      break;
    case "This Month":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date();
      break;
    case "Last Month":
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      endDate = new Date(today.getFullYear(), today.getMonth(), 0);
      break;
    default:
      console.log("How da fuk??????")
  }

  setStartDate(startDate); 
  setEndDate(endDate); 
};


const handlePeriodSelect = (period : string) => {
  
  if(period === selectedPeriod){
    applyTimeRange(period);
    setSelectedPeriod('');
    return false
  }
  else{
    applyTimeRange(period);
    setSelectedPeriod(period);
    return true;
  }
}

const handleFilter = (category_ : string, type_ : string, startDate_ : Date | undefined, endDate_ : Date | undefined) => {
  setCategory(category_);
  setType(type_);
  setStartDate(startDate_);
  setEndDate(endDate_);
}

const handleTransUpdate = async(category_: string, description_: string, amount_: number) => {
  const res = await updateTransaction({
    expenseId: transactions[selectedTransIndex].id,
    updateData: {
      amount: amount_, 
      description: description_, 
      category: category_
    },
  })

  if (!res)
    return


  setTransactions(prevTransactions => {
      const newTransactions = [...prevTransactions]; 
      newTransactions[selectedTransIndex] = { 
          ...newTransactions[selectedTransIndex], 
          amount: amount_, 
          description: description_, 
          category: category_
      }; 
      return newTransactions; 
  });
};

const handleSeacch = (searchText_ : string) => {
  setSearchText(searchText_)
}



  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
          {isSearching ? 
            <SearchBar handleSearch={handleSeacch}/>
            :
            <Dropdown
            style={styles.dropdown}
            data={wallets}
            labelField="label"
            valueField="label"
            placeholder="Wallets"
            placeholderStyle={styles.placeholderText} 
            value={selectedWallet}
            onChange={(item) => setSelectedWallet(item.label)}
            />
          }

        <TouchableOpacity style={styles.iconButton} onPress={() => {setIsSearching(!isSearching)}}>
          {isSearching ? 
          <View>
            <Text>X</Text>
          </View>
          :
          <Icon name="search" size={17} color="black" />
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => {setFilterVisible(true)}}>
          <Text>⋮</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.timeSelectContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScrollView}>
          <TimeSelect label="This Week" onPress={handlePeriodSelect} isSelected={selectedPeriod === 'This Week'} />
          <TimeSelect label="Last Week" onPress={handlePeriodSelect} isSelected={selectedPeriod === 'Last Week'} />
          <TimeSelect label="This Month" onPress={handlePeriodSelect} isSelected={selectedPeriod === 'This Month'} />
          <TimeSelect label="Last Month" onPress={handlePeriodSelect} isSelected={selectedPeriod === 'Last Month'} />
        </ScrollView>
      </View>


      {/* Danh sách giao dịch */}
      <View style={styles.transactionsLog}>
        {loading ? 
          <ActivityIndicator size='large' color="#3498db" style={[styles.loading, { transform: [{ scale: 2 }] }]}/>
          :
          transactions.length === 0 ?
            <View  style={styles.emptyContainer}> 
              <Icons style={styles.emptyIcon} name="search-off" size={60} color="#888" /> 
                <Text style={styles.emptyWarnTitle}>No matching transactions found!</Text>
                <Text style={styles.emptyWarn}>Try a different keyword or adjust the filters.</Text>
            </View>
            :
            <FlatList
              data={transactions}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => <TransactionItem transaction = {item} onPress={() => {setSelectedTransIndex(index), setEditModalVisible(true)}}/>}
            />
        }
      </View>

      {/* Nút Floating Button */}
      {/* <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity> */}

      {/* Pop Up Filter */}
      <FilterModal isVisible={isFilterVisible} category={category} type={type} 
                    startDate_={startDate} endDate_={endDate} confifm={handleFilter} close={() =>setFilterVisible(false)}/>
      {!loading && <TransferEditModal key={selectedTransIndex} visible={isEditModalVisible} updateConfirm={handleTransUpdate} 
                                      transactionInfo={transactions[selectedTransIndex]} close={() => setEditModalVisible(false)}/>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'rgba(128, 128, 128, 0.05)'},
  header: { flexDirection: "row", gap: 20, paddingTop: 60, paddingHorizontal: 20, paddingBottom: 10, alignItems: "center", backgroundColor: "white" },
  timeSelectContainer: {marginVertical: 20, paddingHorizontal: 20},
  timeScrollView: {},
  iconButton: {
    width: 40, 
    height: 40,
    justifyContent: "center", 
    alignItems: "center", 
    borderWidth: 2,
    borderColor: 'rgba(128, 128, 128, 0.2)',
    borderRadius: 8, 
    backgroundColor: "white", 
  },
  transactionsLog:{
    paddingHorizontal: 20,
    height: '70%'
  },
  placeholderText: {color: 'white', fontWeight: 'bold', fontSize: 17},
  // floatingButton: {
  //   position: "absolute",
  //   bottom: 20,
  //   right: 20,
  //   backgroundColor: "#3D82F6",
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // floatingButtonText: { color: "white", fontSize: 30 },
  dropdown: {
    flex: 1,
    backgroundColor: "rgba(103, 111, 227, 0.5)",
    padding: 12,
    borderRadius: 8,
  },
  emptyContainer: {flex: 1},
  emptyIcon: {alignSelf: 'center', marginTop: '30%'},
  emptyWarnTitle: {alignSelf: 'center', fontSize: 18, fontWeight: 'bold'},
  emptyWarn: {alignSelf: 'center', fontSize: 16},
  loading: {alignSelf: "center", marginTop: '30%'}
});

export default TransactionsScreen;
