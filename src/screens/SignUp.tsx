import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../constants/colors';
import backImage from '../assets/signup.png';
import { Ionicons } from "@expo/vector-icons";
import {registerUser, expenseGet} from "../services/authServices";

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

export default function SignUp() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setUserEmail] = useState('');
    const [message, setMessage] = useState("");
    const onHandleValidate = async() => {
        try{
            const userData = { name, email, password };
            await AsyncStorage.setItem("email", email);
            const result = await registerUser(userData);
            if(result.code == 400){
                setMessage("This email has already been registerd !!!");
                showAlert('message', message);
                }
            else if(result.code == 201){
                navigation.navigate('OTP',{ id: result.metadata.sessionId });
                }
//             await AsyncStorage.setItem('accessToken', result.accessToken);
//             await AsyncStorage.setItem('refreshToken', email.refreshToken);
            }
        catch(error) {
            console.error("Registration Error:", error);  // ✅ Log error details
            setMessage("Registration failed! Check console for details.");
            showAlert('message', message);
            }
        };
    const showAlert = (title, message) => {
          Alert.alert(
            title,
            message,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: true }
          );
        };

    const test = async() => {
        try{
            const result  = await expenseGet();
            if(result.code == 400){
                setMessage("This email has already been registerd !!!");
                showAlert('message', message);
                }
            else if(result.code == 201){
                navigation.navigate('OTP',{ id: result.metadata.sessionId });
                }
//             await AsyncStorage.setItem('accessToken', result.accessToken);
//             await AsyncStorage.setItem('refreshToken', email.refreshToken);
            }
        catch(error) {
            console.error("Registration Error:", error);  // ✅ Log error details
            setMessage("Registration failed! Check console for details.");
            showAlert('message', message);
            }
        };




    return(
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <Image source={backImage} style={styles.backImage} />
                <Text style={styles.title}>Sign up</Text>
                <SafeAreaView style={styles.form}>
                    <Text style={styles.placeHolder}>Fill in these fields!!!</Text>
                    <TextInput
                         style={styles.input}
                         placeholder="username"
                         autoCapitalize="none"
                         autoFocus
                         value={name}
                         onChangeText={(text) => setUsername(text)}
                    />
                    <TextInput
                         style={styles.input}
                         placeholder="user-email"
                         autoCapitalize="none"
                         keyboardType="email-address"
                         textContentType="emailAddress"
                         autoFocus
                         value={email}
                         onChangeText={(text) => setUserEmail(text)}
                    />
                    <TextInput
                         style={styles.input}
                         placeholder="password"
                         autoCapitalize="none"
                         autoCorrect={false}
                         secureTextEntry
                         textContentType="password"
                         value={password}
                         onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={test}>
                         <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 24 }}> Create!!!</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </>
        );
    }
const styles = StyleSheet.create({
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 25 },
    container: {
        justifyContent: 'flex-start',
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
    });