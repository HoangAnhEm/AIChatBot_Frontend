import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/Home';
import NewTransferScreen from '../screens/NewTransfer';
import PaymentScreen from '../screens/Payment';
import DevScreen from '../screens/dev';
import DevScreen2 from '../screens/dev2';
import TransferComplete from '../screens/TransferComplete';




const Stack = createStackNavigator();

const RootNavigator = () => {
  return (  
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="NewTransferScreen" component={NewTransferScreen} />
        <Stack.Screen name="DevScreen" component={DevScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="TransferComplete" component={TransferComplete} />
        <Stack.Screen name="DevScreen2" component={DevScreen2} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;  
