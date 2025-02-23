import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Image} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Feather";

const initialMessages = [
  { id: "1", text: "Hello! How can i help you?", sender: "other" },
  { id: "2", text: "How your life is going?", sender: "other" },
  { id: "3", text: "Perfect!", sender: "me" },
  { id: "4", text: "What about you?", sender: "me" },
  { id: "5", text: "Not so good...", sender: "other" },
];

const ChatScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const timestamp = Date.now();
      const newMessage = { id: timestamp.toString(), text: inputText, sender: "me" };
      const newResponse = { id: (timestamp + Math.floor(Math.random() * 1000)).toString(), text: "Ăn nói xamlon", sender: "other" };
      
      setMessages([...messages, newMessage, newResponse]);
      setInputText("");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* Header với nút Back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Image source={require("../assets/avatar.png")} style={styles.avatar} />
        <View style={styles.detail}>
          <Text style={styles.headerTitle}>AI Support</Text>
          <Text style={styles.headerText}>Your Personal Ai Bla Bla</Text>
        </View>
      </View>

      {/* Danh sách tin nhắn */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === "me" ? styles.myMessage : styles.otherMessage]}>
            <Text style={[styles.messageText, item.sender === "me" ? styles.myMessageText : styles.otherMessageText]}>
              {item.text}
            </Text>
          </View>
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />  

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
  safeAreaView: { flex: 1, backgroundColor: "#D9EDFC", padding: 10},
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3DB8FF",
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
});

export default ChatScreen;