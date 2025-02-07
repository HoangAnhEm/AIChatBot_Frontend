import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ForgotP from '../screens/ForgotPassword'

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (  
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="LG" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotP} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;  
