import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthNavigation";
import MainTab from "./MainNavigaton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from '../api/navigationRef';

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();

    const subscribe = setInterval(() => {
      checkLoginStatus();
    }, 1000);

    return () => clearInterval(subscribe); // Cleanup on unmount
  }, []);

  return (
    <NavigationContainer ref = {navigationRef}>
      {<AuthStack />}
    </NavigationContainer>
  );
}



