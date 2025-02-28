import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Image, ActivityIndicator} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Feather";
import {AIChat} from "../api/AiApi"
import {AIPersonalities} from "../constants/AiPersonaltity"
import { Dropdown } from "react-native-element-dropdown";

interface Message {
  text: string;
  sender: string;
  time: string;
  loading: boolean;
}


const ChatScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  // const [loading, setloading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [personality, setpersonality] = useState("friendly");

  const flatListRef = useRef<FlatList>(null);

  const getPersonalityColor = (name: string) => {
      const personality_ = AIPersonalities.find(per => per.name.trim() === name.trim());
      return personality_ ? personality_.color : 'white';
  };

  const getPersonalityBackColor = (name: string) => {
    const personality_ = AIPersonalities.find(per => per.name.trim() === name.trim());
    return personality_ ? personality_.backColor : 'white';
  };

  const getPersonalityTitle = (name: string) => {
    const personality_ = AIPersonalities.find(per => per.name.trim() === name.trim());
    return personality_ ? personality_.title : '?';
  };
  

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = async () => {
    setInputText("")
    if (inputText.trim()) {
      // setloading(true)
      const newMessage = { 
        time: Date.now().toString(), 
        text: inputText, 
        sender: "me", loading: false
      };
      const loadingResponse = { 
        time: Date.now().toString() + 1, 
        text: '', 
        sender: "other", loading: true
      };
      setMessages([...messages, newMessage, loadingResponse]);

      // const newResponse = { id: (Date.now() + Math.floor(Math.random() * 1000)).toString(), text: "Ăn nói xamlon", sender: "other" };
      try {
        const Response = await AIChat({query: inputText, personality: personality})
        const newResponse = { 
          time: Date.now().toString() + 2, 
          text: Response['advice'], 
          sender: "other", loading: false
        }
        // setloading(false)
        setMessages((prev) => {
          const prevMess = [...prev.slice(0, -1), newResponse]; 
          return prevMess
        })

      } catch (error) {
        const newResponse = { 
          time: Date.now().toString() + 2, 
          text: "Oops, smth went wrong :<", 
          sender: "other", loading: false
        }
        // setloading(false)
        setMessages((prev) => {
          const prevMess = [...prev.slice(0, -1), newResponse]; 
          return prevMess
        })
        console.error("Lỗi khi gọi AI:", error);
      } finally {

      }
    }
  };

  return (
    <SafeAreaView style={[styles.safeAreaView, {backgroundColor: getPersonalityBackColor(personality)}]}>
      {/* Header với nút Back */}
      <View style={[styles.header, {backgroundColor: getPersonalityColor(personality)}]}>
        <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Image source={require("../assets/avatar.png")} style={styles.avatar} />
        <View style={styles.detail}>
          {/* <Text style={styles.headerTitle}>AI Support</Text> */}
          <Dropdown
            style={[styles.dropdown, {backgroundColor: getPersonalityColor(personality)}]}
            data={AIPersonalities}
            labelField="name"
            valueField="name"
            value={personality}
            onChange={(item) => setpersonality(item.name)}
          />
          <Text style={styles.headerText}>{getPersonalityTitle(personality)}</Text>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.time}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === "me" ? styles.myMessage : styles.otherMessage]}>
            {item.loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={[styles.messageText, item.sender === "me" ? styles.myMessageText : styles.otherMessageText]}>
                {item.text}
              </Text>
            )}
          </View>
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      {/* Ô tạo yêu cầu */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>Request AI</Text>
      </TouchableOpacity>

      {/* Ô nhập tin nhắn */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a message"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Icon name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, padding: 10},
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 40,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  detail: {marginLeft: 10},
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  headerText: {
    fontSize: 16,
    color: "white",
  },
  floatingButton: {
    position: "relative",
    bottom: 0,
    left: 20,
    backgroundColor: "#3DB8FF",
    height: 40, width: 110,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingButtonText: { color: "white", fontSize: 16 },
  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#3DB8FF",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "white",
  },
  messageText: { fontSize: 16 },
  myMessageText: { color: "white" },
  otherMessageText: { color: "black" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 10,
    margin: 10,
  },
  input: { flex: 1, fontSize: 16, paddingHorizontal: 10 },
  sendButton: {
    backgroundColor: "#3DB8FF",
    padding: 10,
    borderRadius: 20,
  },
  dropdown: {
    borderRadius: 8,
  },
});

export default ChatScreen;