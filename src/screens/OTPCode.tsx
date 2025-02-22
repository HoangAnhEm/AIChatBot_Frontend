import React, { useState, useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { colors } from '../constants/colors';
import OTPInput, { OTPInputHandle }  from '../components/OTP.tsx';
import backImage from '../assets/otp_screen.png';
import { Ionicons } from "@expo/vector-icons";

import {getOTP, verifyOTP} from "../services/authServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');


export default function ValidateCodeScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'OTP'>>();
    const[code, setCode] = useState('');
    const [message, setMessage] = useState("");

    const getCode = async() => {
        try{
            const email = await AsyncStorage.getItem('email');
            const data = {email};
            const code = await getOTP(data);
            console.log('code:', code);
            }
        catch(error){
            console.error("OTP Error:", error);
            }
        };


    const otpRef = useRef<OTPInputHandle>(null);

    const handleOTPComplete = async(otp: string) => {
        console.log('Completed OTP:', otp);
        try{
            const sessionId = route.params.id;
            if(sessionId != 'null'){
                const email = await AsyncStorage.getItem('email');
                const otpCode = otp;

                console.log(sessionId);
                console.log(email);
                const data = {email,otpCode,sessionId};
                const code = await verifyOTP(data, {'x-ssid': sessionId});
                if(code.code == 201){
                    setMessage("Sign up successfully !!!");
                    showAlert('message', message);
                    navigation.navigate('Login');
                    }
                }
            else{
                const email = await AsyncStorage.getItem('email');
                const otpCode = otp;
                navigation.navigate('ConfirmPassword',{ 'otpCode': otpCode })
                }
//             const email = await AsyncStorage.getItem('email');
//             const otpCode = otp;
//             const sessionId = route.params.id;
//             console.log(sessionId);
//             console.log(email);
//             const data = {email,otpCode,sessionId};
//             const code = await verifyOTP(data, {'x-ssid': sessionId});
//             if(code.code == 201){
//                 setMessage("Sign up successfully !!!");
//                 showAlert('message', message);
//                 navigation.navigate('Login');
//             }
        }
        catch(error){
            console.error("OTP Error:", error);
            }
        };


    const handleClear = () => {
        otpRef.current?.clear();
    };

    const showAlert = (title, message) => {
        Alert.alert(
            title,
            message,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: true }
          );
        };



return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Image source={backImage} style={styles.backImage} />
            <Text style={styles.title}>Sign up</Text>
            <SafeAreaView style={styles.form}>
                <Text style={styles.placeHolder}>Fill in these fields!!!</Text>
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
                     <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 24 }}> Create!!!</Text>
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
        alignSelf: 'left',
        color: '#9EFFEC',
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
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
        top: 40, // Điều chỉnh nếu cần
        //left: 20,
        zIndex: 10, // Đảm bảo hiển thị trên các phần khác
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