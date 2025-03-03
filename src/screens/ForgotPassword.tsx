import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { forgotPassword } from "../services/authServices";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Text,
  View,
  Alert,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

// Define the RootStackParamList type
type RootStackParamList = {
  ForgotPassword: undefined;
  OTP: { id: string };
};

export default function ForgotPassword() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ForgotPassword'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ForgotPassword'>>();
  const [email, setEmail] = useState('');

  const onHandleCheckP = async () => {
    try {
      await AsyncStorage.setItem("email", email);
      await forgotPassword({ email });
      navigation.navigate('OTP', { id: 'null' });
    } catch (error) {
      showAlert('Error', 'Failed to process request. Please try again later.');
      console.error(error);
    }
  };

  const showAlert = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>  
      <Text style={styles.header}>
        Reclaim password
      </Text>
      <Text style={styles.normalText}>
        Click the button below and check email for OTP
      </Text>
      <SafeAreaView style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="user-email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleCheckP}>
          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 24 }}> Reclaim!!!</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#005A64',
    flex: 1,
    paddingHorizontal: 30,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#9EFFEC',
    borderRadius: 20,
    height: 58,
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 80,
  },
  header: {
    alignSelf: 'flex-start', // Changed from 'left' which is not valid
    color: '#9EFFEC',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 30,
    paddingTop: 200,
  },
  normalText: {
    alignSelf: 'flex-start', // Changed from 'left' which is not valid
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#9EFFEC',
    borderRadius: 20,
    fontSize: 16,
    height: 40,
    marginBottom: 15,
    marginTop: 15,
    padding: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 10,
    zIndex: 10,
    padding: 10,
    borderRadius: 8,
  },
  backText: {
    fontSize: 16,
    color: "black",
    marginLeft: 5,
  },
});