import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TransactionsScreen from '../screens/TransactionsScreen';
import HomeScreen from "../screens/Home";

const Stack = createStackNavigator();

export default function TransactionLogStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
