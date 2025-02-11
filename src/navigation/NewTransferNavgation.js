import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewTransferScreen from "../screens/NewTransfer";
import TransferDetailScreen from "../screens/TransferDetail";
import TransferCompleteScreen from "../screens/TransferComplete";
import HomeScreen from "../screens/Home";

const Stack = createStackNavigator();

export default function NewTransferStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false , }}>
      <Stack.Screen name="NewTransfer" component={NewTransferScreen} />
      <Stack.Screen name="TransferDetail" component={TransferDetailScreen} />
      <Stack.Screen name="TransferComplete" component={TransferCompleteScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
