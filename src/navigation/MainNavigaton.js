import React from "react";
import HomeScreen from "../screens/Home";
import DevScreen from "../screens/dev";
import NewTransferStack from "./NewTransferNavgation";
import TransactionLogStack from './TransactionsLogNavigation'
import BottomTabNavigator from "../components/bottomNaviagtor";


const tabs = [
  { name: "Home", component: HomeScreen, icon: "home" },
  { name: "NewTransferStack", component: NewTransferStack, icon: "exchange" },
  { name: "AIChatStack", component: NewTransferStack, icon: "comments" },
  { name: "TransactionLogStack", component: TransactionLogStack, icon: "history" },
  { name: "DevScreen", component: DevScreen, icon: "history" },
];

export default function App() {
  return (
    <BottomTabNavigator tabs={tabs} />
  );
}

