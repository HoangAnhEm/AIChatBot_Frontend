import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TransactionStatisticsScreen from "../screens/TransactionStatisticsScreen"
import CategoryScreen from "../screens/CategoryScreen"

const Stack = createStackNavigator();

export default function TransactionStatisticsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="TransactionStatisticsScreen" component={TransactionStatisticsScreen} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
    </Stack.Navigator>
  );
}
