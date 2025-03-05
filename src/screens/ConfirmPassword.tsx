import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import axios, { AxiosError } from "axios";

import { verifyOTP } from "../services/authServices";
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
  ConfirmPassword: { otpCode: string };
  Login: undefined;
};

export default function ConfirmPassword() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ConfirmPassword'>>();
    const route = useRoute<RouteProp<RootStackParamList, 'ConfirmPassword'>>();

    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const onHandleConfirm = async() => {
        const email = await AsyncStorage.getItem('email');
        const otpCode = route.params.otpCode;
        const data = {email, otpCode, newPassword, reNewPassword};
        
        try {
            const result = await verifyOTP(data);
            if (result.code == 200) {
                const successMsg = "Password reset successfully!!!";
                setMessage(successMsg);
                showAlert('Message', successMsg);
                navigation.navigate('Login');
            }
        }
        catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    const errorMsg = "Passwords do not match or OTP is wrong!!!";
                    setMessage(errorMsg);
                    showAlert("Message", errorMsg);
                    return;
                }
            }
        
            console.error("Unexpected Error:", error);
            showAlert("Error", "Something went wrong. Please try again.");
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
            <Text style={styles.header}>
                Confirm password
            </Text>
            <Text style={styles.normalText}>
                Fill in the password field!!!
            </Text>
            <SafeAreaView style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="New password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    autoFocus
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm new password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={reNewPassword}
                    onChangeText={(text) => setReNewPassword(text)}
                />
                <TouchableOpacity style={styles.button} onPress={onHandleConfirm}>
                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 24 }}>Confirm</Text>
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
        alignSelf: 'flex-start',
        color: '#9EFFEC',
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 30,
    },
    form: {
        flex: 1,
        justifyContent: 'flex-start',
        marginHorizontal: 30,
        paddingTop: 200,
    },
    normalText: {
        alignSelf: 'flex-start',
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
});