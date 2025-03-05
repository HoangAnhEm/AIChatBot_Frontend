import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthNavigation";
import MainTab from "./MainNavigation"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from '../api/navigationRef';
import { AuthContextProvider, useAuthContext } from "../contexts/AuthContext";

export default function RootNavigator() {
  return (
    <AuthContextProvider>
      <NavigationContainer ref={navigationRef}>
        <AuthNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
}

function AuthNavigator() {
  const isLoggedIn = useAuthContext().isLoggin;
  const setIsLoggedIn = useAuthContext().setLoginState;

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <>
      {isLoggedIn ? <MainTab /> : <AuthStack />}
    </>
  );
}
