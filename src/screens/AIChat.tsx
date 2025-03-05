import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Image, ActivityIndicator} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Feather";
import {AIChat, AIAsk} from "../api/AiApi"
import {AIPersonalities} from "../constants/AiPersonaltity"
import { Dropdown } from "react-native-element-dropdown";
import Transaction from "../model/Transaction.model";
import TransferEditModal from "../components/transferEditModal";
import {createTransactions} from "../api/transactionApi"

interface Message {
  text: string;
  sender: string;
  time: string;
  loading: boolean;
}


const ChatScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isNewTrans, setisNewTrans] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [personality, setpersonality] = useState("friendly");
  const [chattingType, setchattingType] = useState("Tạo giao dịch");
  const [transactionInfo, settransactionInfo] = useState<Transaction | undefined>(undefined);

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
  
  const handleTransUpdate = async () => {
    setIsEditModalVisible(false)
    setisNewTrans(false)
    var response : string = ""
    try {
      await createTransactions({
        amount: transactionInfo?.amount, 
        partner: transactionInfo?.partner,
        wallet: transactionInfo?.wallet,
        type: transactionInfo?.type,
        category: transactionInfo?.category,
        description: transactionInfo?.description,
      });
      response = 'Tạo giao dịch thành công'
    } catch (error) {
      response = 'Tạo giao dịch thất bại'
    } finally {
      const newResponse = { 
        time: Date.now().toString() + 2, 
        text: response, 
        sender: "other", loading: false
      }
  
      setMessages((prev) => {
        const prevMess = [...prev, newResponse]; 
        return prevMess
      })
    }
  }

  const handleCancel = () => {
    setIsEditModalVisible(false)
    setisNewTrans(false)
  }

  const handleSwitchChattingType = () => {
    setchattingType(chattingType === "Tạo giao dịch" ? "Lấy giao dịch" : "Tạo giao dịch")
  }


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

      if(chattingType === "Tạo giao dịch"){
        try {
          const Response = await AIChat({query: inputText, personality: personality})
  
          if(Response['description'] || Response['category'] || Response['amount'] || Response['type'] || Response['partner']){
            settransactionInfo(new Transaction({
              _id : null,
              amount: Response['amount'] ? Response['amount'] : 0,
              wallet: "Wallet number 1",
              partner: Response['partner'] ? Response['partner'] : 0,
              type: Response['type'] ? Response['type'] : 0,
              category: Response['category'] ? Response['category'] : 0,
              description: Response['description'] ? Response['description'] : 0,
              createdAt: Date.now().toString()
            }));
            setisNewTrans(true)
          }
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
        } 
      }

      else{
        try {
          const Response = await AIAsk({query: inputText})
          const newResponse = { 
            time: Date.now().toString() + 2, 
            text: Response['summary'], 
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
        } 
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

      <View style={styles.floatingButtons}>
        {/* Ô tạo yêu cầu */}
        <TouchableOpacity style={styles.floatingButton} onPress={handleSwitchChattingType}> 
          <Text style={styles.floatingButtonText}>{chattingType}</Text>
        </TouchableOpacity>

        <View style={{flex: 1}}></View>

        {/* Ô xác nhận giao dịch */}
        {isNewTrans && <TouchableOpacity style={styles.floatingNofi} onPress={() => {setIsEditModalVisible(true)}}>  
          <Text style={styles.floatingButtonText}>New Transfer!!</Text>
        </TouchableOpacity>}
      </View>
      {(transactionInfo !== undefined) && <TransferEditModal visible={isEditModalVisible} updateConfirm={handleTransUpdate} 
                                      transactionInfo={transactionInfo} close={handleCancel}/>}
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
  floatingButtons: {
    flexDirection: "row",
    position: "relative",
    bottom: 0,
    paddingHorizontal: 10,
    height: 40, 
    marginBottom: 10
  },
  floatingButton: {
    backgroundColor: "#3DB8FF",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  floatingNofi: {
    backgroundColor: "#3DB8FF",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10
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
    marginHorizontal: 10,
    marginBottom: 10,
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
  chattingType: {
    fontSize: 16,
    color: "white",
  }
});

export default ChatScreen;