import React from "react";
import HomeScreen from "../screens/Home";
import DevScreen from "../screens/dev";
import NewTransferStack from "./NewTransferNavgation";
import TransactionLogStack from './TransactionsLogNavigation'
import BottomTabNavigator from "../components/bottomNaviagtor";
import TransactionStatisticsStack from "./StatisticsNavigation";
import AiChat from "../screens/AIChat";

const tabs = [
  { name: "Home", component: HomeScreen, icon: "home" },
  { name: "NewTransferStack", component: NewTransferStack, icon: "exchange" },
  { name: "AIChatStack", component: AiChat, icon: "comments" },
  { name: "TransactionLogStack", component: TransactionLogStack, icon: "history" },
  { name: "TransactionStatisticsStack", component: TransactionStatisticsStack, icon: "line-chart" },
];

export default function App() {
  return (
    <BottomTabNavigator tabs={tabs} />
  );
}

