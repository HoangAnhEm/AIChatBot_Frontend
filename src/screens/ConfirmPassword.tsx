import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { colors } from '../constants/colors';
import backImage from '../assets/ts.png';
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

export default function ConfirmPassword() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'ConfirmPassword'>>();

    const[newPassword, setNewPassword] = useState('');
    const[reNewPassword, setReNewPassword] = useState('');
    const[message, setMessage] = useState('');


    const onHandleConfirm = async() =>{
        const email = await AsyncStorage.getItem('email');
        const otpCode = route.params.otpCode;
        const data = {email, otpCode, newPassword, reNewPassword}
        try{
            const result = await verifyOTP(data);
            if(result.code == 400){
                setMessage("password do not match or OTP is wrong !!!");
                showAlert('message', message);
                }
            else if(result.code == 200){
                setMessage("reset successfully !!!");
                showAlert('message', message);
                navigation.navigate('Login');
                }
            }
        catch(error){
            console.error("Confirm Error:", error);
            }
        console.log('email:', email);
        };

    const showAlert = (title, message) => {
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
                Fill in the password field !!!
            </Text>
            <SafeAreaView style={styles.form}>
                <TextInput
                     style={styles.input}
                     placeholder="new-password"
                     autoCapitalize="none"
                     autoFocus
                     value={newPassword}
                     onChangeText={(text) => setNewPassword(text)}
                />
                <TextInput
                     style={styles.input}
                     placeholder="renew-password"
                     autoCapitalize="none"
                     autoFocus
                     value={reNewPassword}
                     onChangeText={(text) => setReNewPassword(text)}
                />
                <TouchableOpacity style={styles.button} onPress={onHandleConfirm}>
                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 24 }}> Button!!!</Text>
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
        alignSelf: 'left',
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
        alignSelf: 'left',
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
    })