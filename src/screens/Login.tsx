import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../constants/colors';
import backImage from '../assets/ts.png';
import {loginUser} from "../services/authServices";

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

export default function Test() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const showAlert = (title: string, message: string) => {
      Alert.alert(title, message, [{ text: "OK" }]);
    };

    const onHandleLG = async () => {
        try{
            const userData = { email, password };
            const result = await loginUser(userData);
            if(result.code = 200){
                setMessage("Login Successful!");
                console.log("Data", result);
                await AsyncStorage.setItem('accessToken', result.metadata.accessToken);
                await AsyncStorage.setItem('refreshToken', result.metadata.refreshToken);
                showAlert('message', message);
                }
            else{
                setMessage("Something went wrong !!!");
                showAlert('message', message);
                console.log("Server Response:", result);
                }

            }
        catch(error) {
            console.error("Login Error:", error);  //  Log error details
            setMessage("Login failed! Check console for details.");
            }
        };

    const onHandleSignUp = () => {
        navigation.navigate('SignUp');
        };

    return (
      <>
        <View style={styles.container}>
          <Image source={backImage} style={styles.backImage} />
          <Text style={styles.title}>SSM</Text>
          <Text style={styles.description}>Payment management</Text>

          <SafeAreaView style={styles.form}>
            <Text style={styles.placeHolder}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="email"
              autoCapitalize="none"
              textContentType="emailAddress"
              autoFocus
              value={email}
              onChangeText={(text) => setEmail(text)}
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

            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>
                Forgot your password? &nbsp;
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={{ color: colors.pink, fontWeight: '600', fontSize: 14 }}>Recover Password</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.lButton} onPress={onHandleLG}>
              <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 22, alignSelf: 'center' }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onHandleSignUp}>
              <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 24 }}>Sign Up</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </>
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
    lButton: {
        alignSelf: 'center',
        backgroundColor: '#9EFFEC',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        marginTop: 40,
        width: 100
        },
    button: {
        alignItems: 'center',
        backgroundColor: '#9EFFEC',
        borderRadius: 10,
        height: 58,
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 60,
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
        color: 'black',
        fontSize: 24,
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
        // position: "absolute",
        // top: 40,
        // left: 20,
      },
    backText: {
        fontSize: 16,
        color: "green",
        marginLeft: 5,
      },
    });