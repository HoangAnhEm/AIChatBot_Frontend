import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import FeatureButton from '../components/featureButton'

const transactions = [
  { id: '1', title: 'Rental Income', date: '14 July 2021', amount: '+$6,500.00', color: 'green', icon: 'home' },
  { id: '2', title: 'Grocery Shopping', date: '22 July 2021', amount: '-$300.49', color: 'red', icon: 'shopping-cart' },
  { id: '3', title: 'Grocery Shopping', date: '22 July 2021', amount: '-$300.49', color: 'red', icon: 'shopping-cart' },
  { id: '4', title: 'Grocery Shopping', date: '22 July 2021', amount: '-$300.49', color: 'red', icon: 'shopping-cart' },
  { id: '5', title: 'Grocery Shopping', date: '22 July 2021', amount: '-$300.49', color: 'red', icon: 'shopping-cart' },
  { id: '6', title: 'Grocery Shopping', date: '22 July 2021', amount: '-$300.49', color: 'red', icon: 'shopping-cart' },
  { id: '7', title: 'Grocery Shopping', date: '22 July 2021', amount: '-$300.49', color: 'red', icon: 'shopping-cart' },
  { id: '8', title: 'Grocery Shopping', date: '22 July 2021', amount: '-$300.49', color: 'red', icon: 'shopping-cart' },

];

const HomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  return (
    <SafeAreaView style={styles.safeAreaView}>
        {/* Header */}
        <View style={styles.header}>
          <Icon name="menu" size={24} color="#000" />
          <Text style={styles.headerTitle}>Home</Text>
          <View style={styles.profileIcon} />
        </View>

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.username}>Indigo Violet</Text>

        {/* Card Section */}
        <View style={[styles.card, { backgroundColor: '#74C0FC' }]}>
        <Text style={styles.cardTitle}>Bartholomew Shoe</Text>
        <Text style={styles.cardNumber}>****  ****  ****  5678</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardText}>VALID THRU</Text>
          <Text style={styles.cardText}>CVV</Text>
        </View>
        <View style={styles.cardFooter}>
            <Text style={styles.cardDate}>07/24</Text>
            <Icon name="toggle-right" size={24} color="#fff" />
          </View>
        </View>


        {/* Transactions */}
        <Text style={styles.sectionTitle}>Previous Transactions</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Icon name={item.icon} size={24} color="#555" />
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text style={[styles.transactionAmount, { color: item.color }]}>{item.amount}</Text>
            </View>
          )}
        />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: '#F8FAFC', padding: 20, marginTop: 30},
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  profileIcon: { width: 24, height: 24, backgroundColor: '#E0E0E0', borderRadius: 12 },
  welcomeText: { fontSize: 16, color: '#666' },
  username: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: { borderRadius: 15, padding: 20, marginBottom: 20 },
  cardTitle: { fontSize: 16, color: '#fff', marginBottom: 10 },
  cardNumber: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  cardText: { fontSize: 12, color: '#ddd' },
  cardDate: { fontSize: 14, fontWeight: 'bold', color: '#fff' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  operationsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  operationButton: { width: 50, height: 50, backgroundColor: '#EDEDED', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  transactionItem: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#FFF', borderRadius: 10, marginBottom: 10 },
  transactionDetails: { flex: 1, marginLeft: 10 },
  transactionTitle: { fontSize: 14, fontWeight: 'bold' },
  transactionDate: { fontSize: 12, color: '#666' },
  transactionAmount: { fontSize: 14, fontWeight: 'bold' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: '#FFF', borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  navButton: { padding: 10 },
});

export default HomeScreen;
