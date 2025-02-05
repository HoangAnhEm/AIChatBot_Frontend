import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../constants/colors';
import backImage from '../assets/signup.png';

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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const onHandleSignUp = () => {
            //Chua co backend
        };

    return(
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage} />
            <Text style={styles.title}>Sign up</Text>
            <SafeAreaView style={styles.form}>
                <Text style={styles.placeHolder}>Fill in these fields!!!</Text>
                <TextInput
                     style={styles.input}
                     placeholder="username"
                     autoCapitalize="none"
                     textContentType="emailAddress"
                     autoFocus
                     value={username}
                     onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                     style={styles.input}
                     placeholder="user-email"
                     autoCapitalize="none"
                     keyboardType="email-address"
                     textContentType="emailAddress"
                     autoFocus
                     value={userEmail}
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
                <TouchableOpacity style={styles.button} onPress={onHandleSignUp}>
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
    });