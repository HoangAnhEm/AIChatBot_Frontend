import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthNavigation";
import MainTab from "./MainNavigaton";

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTab /> : <AuthStack />}
    </NavigationContainer>
  );
}



