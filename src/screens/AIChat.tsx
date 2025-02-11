import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const initialMessages = [
  { id: "1", text: "Hello!", sender: "other" },
  { id: "2", text: "How your life is going?", sender: "other" },
  { id: "3", text: "Perfect!", sender: "me" },
  { id: "4", text: "What about you?", sender: "me" },
  { id: "5", text: "Not so good...", sender: "other" },
];

const ChatScreen = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = { id: Date.now().toString(), text: inputText, sender: "me" };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Danh sách tin nhắn */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === "me" ? styles.myMessage : styles.otherMessage]}>
            <Text style={[styles.messageText, item.sender === "me" ? styles.myMessageText : styles.otherMessageText]}>
              {item.text}
            </Text>
          </View>
        )}
        inverted // Để tin nhắn mới nhất ở cuối danh sách
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#D9EDFC", padding: 10 },
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
