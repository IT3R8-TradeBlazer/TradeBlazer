import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  SafeAreaView,
} from "react-native";

import Header from "../../components/Header";
import { useMessages } from "../../context/MessagesContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../../components/CustomAlert";

export default function ChatScreen({ navigation, route }) {
  const contactId = route?.params?.idNumber;
  const contactName = route?.params?.name;
  const { messages, setMessages } = useMessages();

  const [text, setText] = useState("");
  const listRef = useRef(null);
  const [myId, setMyId] = useState(null);

  // ✅ Get current user ID
  useEffect(() => {
    const getMyId = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const parsed = JSON.parse(userData);
        setMyId(parsed.idNumber);
      }
    };
    getMyId();
  }, []);

  // ✅ Get current user's messages with this contact
  const chatMessages =
    (myId && messages[myId] && messages[myId][contactId]) || [];

  // ✅ Send message (per-user)
  const sendMessage = async () => {
    if (!text.trim() || !myId) return;

    const newMsg = {
      id: Date.now().toString(),
      text: text.trim(),
      senderId: myId,
      receiverId: contactId,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => {
      const userChats = prev[myId] || {};
      const contactChats = userChats[contactId] || [];
      return {
        ...prev,
        [myId]: {
          ...userChats,
          [contactId]: [newMsg, ...contactChats],
        },
      };
    });

    setText("");
    setTimeout(() => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 100);
  };

  // ✅ Delete message with custom confirmation
  const [isDeleteAlertVisible, setIsDeleteAlertVisible] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  const handleDeleteMessage = (id) => {
    setMessageToDelete(id); // Store the message id to be deleted
    setIsDeleteAlertVisible(true); // Show the confirmation modal
  };

  const handleDeleteConfirm = (action) => {
    if (action === "delete" && messageToDelete) {
      // Delete message from state
      setMessages((prev) => {
        const userChats = prev[myId] || {};
        const contactChats = userChats[contactId] || [];
        return {
          ...prev,
          [myId]: {
            ...userChats,
            [contactId]: contactChats.filter((msg) => msg.id !== messageToDelete),
          },
        };
      });
    }
    setIsDeleteAlertVisible(false); // Close the alert in both cases
  };

  // ✅ Render each message
  const renderItem = ({ item }) => {
    const isMe = item.senderId === myId;

    return (
      <TouchableOpacity
        onLongPress={() => handleDeleteMessage(item.id)}
        delayLongPress={300}
      >
        <View
          style={[styles.messageRow, isMe ? styles.rowRight : styles.rowLeft]}
        >
          <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
            <Text
              style={[
                styles.messageText,
                isMe ? styles.messageTextMe : styles.messageTextOther,
              ]}
            >
              {item.text}
            </Text>
            <Text
              style={[
                styles.timeText,
                isMe ? styles.timeTextMe : styles.timeTextOther,
              ]}
            >
              {item.time}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Alert for Delete Confirmation */}
      <CustomAlert
        visible={isDeleteAlertVisible}
        title="Delete Message"
        message="Are you sure you want to delete this message?"
        onClose={handleDeleteConfirm} // A function to handle the user's choice
        deleteConfirm={true} // Show delete confirmation buttons
      />

      <Header
        navigation={navigation}
        title={contactName}
        onTitlePress={() => {
          if (contactName === "Syntyche") {
            navigation.navigate("SyntycheProfileScreen");
          } else if (contactName === "Cypress") {
            navigation.navigate("CypressProfileScreen");
          } else if (contactName === "Bryan") {
            navigation.navigate("BryanProfileScreen");
          }
        }}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <FlatList
            ref={listRef}
            data={chatMessages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            inverted
          />

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#8AA88A"
              value={text}
              onChangeText={setText}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECF2E8" },
  content: { flex: 1 },
  listContainer: { paddingHorizontal: 12, paddingTop: 12, paddingBottom: 8 },
  messageRow: { marginVertical: 6, flexDirection: "row" },
  rowLeft: { justifyContent: "flex-start" },
  rowRight: { justifyContent: "flex-end" },
  bubble: { maxWidth: "80%", paddingVertical: 10, paddingHorizontal: 12, borderRadius: 16, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 },
  bubbleOther: { backgroundColor: "#FFFFFF", borderTopLeftRadius: 4 },
  bubbleMe: { backgroundColor: "#2E5E3E", borderTopRightRadius: 4 },
  messageText: { fontSize: 16, lineHeight: 20 },
  messageTextOther: { color: "#2E5E3E" },
  messageTextMe: { color: "#FFFFFF" },
  timeText: { fontSize: 11, marginTop: 6, alignSelf: "flex-end" },
  timeTextOther: { color: "#8AA88A" },
  timeTextMe: { color: "#D6F0D7" },
  inputRow: { flexDirection: "row",  paddingHorizontal: 12,  paddingVertical: 10,  alignItems: "flex-end", backgroundColor: "transparent", }, 
  input: { flex: 1, height: 40, backgroundColor: "#FFFFFF", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, color: "#2E5E3E", fontSize: 16, lineHeight: 22, shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 2, elevation: 1 },
  sendButton: { marginLeft: 8, backgroundColor: "#2E5E3E", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10, justifyContent: "center", alignItems: "center" },
  sendText: { color: "#FFFFFF", fontWeight: "600" },
});
