// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from '../screens/LoginScreen';
// import HomeScreen from '../screens/Home';
// import NewTransferScreen from '../screens/NewTransfer';
// import TransferDetail from '../screens/TransferDetail';
// import DevScreen from '../screens/dev';
// import DevScreen2 from '../screens/dev2';
// import TransferComplete from '../screens/TransferComplete';
// import TransactionsScreen from '../screens/TransactionsScreen';




// const Stack = createStackNavigator();

// const RootNavigator = () => {
//   return (  
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="DevScreen" component={DevScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="DevScreen2" component={DevScreen2} />
//         <Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />
//         <Stack.Screen name="NewTransferScreen" component={NewTransferScreen} />
//         <Stack.Screen name="TransferDetail" component={TransferDetail} />
//         <Stack.Screen name="TransferComplete" component={TransferComplete} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default RootNavigator;  

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



