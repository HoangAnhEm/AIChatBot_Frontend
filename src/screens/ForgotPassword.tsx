import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../constants/colors';
import backImage from '../assets/ts.png';

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

export default function ForgotPassword() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const[email, setEmail] = useState('');

    const onHandleCheckP = () =>{
        if(email != 'Lmao@gmail.com'){

            }
        }

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
                Reclaim password
            </Text>
            <Text style={styles.normalText}>
                Click the button below to have your password sent to your email
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
                <TouchableOpacity style={styles.button} onPress={() => showAlert('Lmao', 'Bruh')}>
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
        fontStyle: 'italic'
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

