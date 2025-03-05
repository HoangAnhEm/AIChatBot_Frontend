import React, { useState, useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { colors } from '../constants/colors';
import OTPInput, { OTPInputHandle } from '../components/OTP';
import backImage from '../assets/otp_screen.png';
import { Ionicons } from "@expo/vector-icons";

import { getOTP, verifyOTP } from "../services/authServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Text,
  View,
  Image,
  Alert,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

// Define navigation types
type RootStackParamList = {
  OTP: { id: string };
  Login: undefined;
  ConfirmPassword: { otpCode: string };
};

const { height, width } = Dimensions.get('window');

export default function ValidateCodeScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'OTP'>>();
    const [code, setCode] = useState('');
    const [message, setMessage] = useState("");
    const otpRef = useRef<OTPInputHandle>(null);

    const showAlert = (title: string, message: string) => {
        Alert.alert(
            title,
            message,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: true }
        );
    };

    const getCode = async() => {
        try {
            const email = await AsyncStorage.getItem('email');
            if (!email) {
                showAlert('Error', 'Email not found. Please go back and try again.');
                return;
            }
            
            const data = { email };
            const code = await getOTP(data);
            console.log('code:', code);
            showAlert('Success', 'OTP has been sent to your email.');
        }
        catch(error) {
            console.error("OTP Error:", error);
            showAlert('Error', 'Failed to get OTP. Please try again.');
        }
    };

    const handleOTPComplete = async(otp: string) => {
        console.log('Completed OTP:', otp);
        try {
            const sessionId = route.params.id;
            
            if(sessionId !== 'null') {
                const email = await AsyncStorage.getItem('email');
                if (!email) {
                    showAlert('Error', 'Email not found. Please go back and try again.');
                    return;
                }
                
                const otpCode = otp;
                console.log(sessionId);
                console.log(email);
                
                const data = { email, otpCode, sessionId };
                const code = await verifyOTP(data, {'x-ssid': sessionId});
                
                if(code.code === 201) {
                    setMessage("Sign up successfully!");
                    showAlert('Success', message || "Sign up successfully!");
                    navigation.navigate('Login');
                } else {
                    showAlert('Error', 'Invalid OTP. Please try again.');
                }
            }
            else {
                const email = await AsyncStorage.getItem('email');
                const otpCode = otp;
                navigation.navigate('ConfirmPassword', { 'otpCode': otpCode });
            }
        }
        catch(error) {
            console.error("OTP Error:", error);
            showAlert('Error', 'Failed to verify OTP. Please try again.');
        }
    };

    const handleClear = () => {
        otpRef.current?.clear();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Image source={backImage} style={styles.backImage} />
            <Text style={styles.title}>OTP Verification</Text>
            <SafeAreaView style={styles.form}>
                <Text style={styles.placeHolder}>Enter verification code</Text>
                <OTPInput
                  ref={otpRef}
                  length={6}
                  onComplete={handleOTPComplete}
                />

                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={handleClear}
                >
                  <Text style={styles.clearButtonText}>Clear Code</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={getCode}>
                     <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 24 }}>Resend Code</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    backImage: {
        height: height,
        position: 'absolute',
        resizeMode: 'cover',
        top: 0,
        width: '100%',
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
    title: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 48,
        fontWeight: 'bold',
        marginTop: 20,
    },
    description: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    placeHolder: {
        alignSelf: 'flex-start',
        color: '#9EFFEC',
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginBottom: 20,
    },
    form: {
        flex: 1,
        justifyContent: 'flex-start',
        marginHorizontal: 30,
        paddingTop: 250,
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
    clearButton: {
        marginTop: 20,
        paddingVertical: 12,
        marginHorizontal: 100,
        backgroundColor: '#9EFFEC',
        borderRadius: 20,
    },
    clearButtonText: {
        color: 'black',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
});