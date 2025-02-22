import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ForgotP from '../screens/ForgotPassword';
import OTP from '../screens/OTPCode';
import ConfirmP from '../screens/ConfirmPassword';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotP} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="ConfirmPassword" component={ConfirmP} />
    </Stack.Navigator>
  );
}
