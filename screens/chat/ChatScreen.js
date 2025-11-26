import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function ChatScreen({ navigation, route }) {
    const contact = route?.params?.name || "Synteche";
    const [messages, setMessages] = useState([
        { id: "1", text: "Hello! How can I help you?", sender: "other", time: "09:41" },
        { id: "2", text: "Hi — I wanted to check on my order.", sender: "me", time: "09:42" },
    ]);
    const [text, setText] = useState("");
    const listRef = useRef(null);

    const sendMessage = () => {
        if (!text.trim()) return;
        const newMsg = {
            id: Date.now().toString(),
            text: text.trim(),
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        // Add to top because FlatList is inverted
        setMessages((prev) => [newMsg, ...prev]);
        setText("");
        // small delay to ensure list updated, then scroll to top (bottom of UI)
        setTimeout(() => listRef.current?.scrollToOffset({ offset: 0, animated: true }), 100);
    };

    const renderItem = ({ item }) => {
        const isMe = item.sender === "me";
        return (
            <View style={[styles.messageRow, isMe ? styles.rowRight : styles.rowLeft]}>
                <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
                    <Text style={[styles.messageText, isMe ? styles.messageTextMe : styles.messageTextOther]}>
                        {item.text}
                    </Text>
                    <Text style={[styles.timeText, isMe ? styles.timeTextMe : styles.timeTextOther]}>{item.time}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} title={contact} />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.content}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={90}
                >
                    <FlatList
                        ref={listRef}
                        data={messages}
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

            <BottomNav navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ECF2E8",
    },
    content: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 8,
    },
    messageRow: {
        marginVertical: 6,
        flexDirection: "row",
    },
    rowLeft: {
        justifyContent: "flex-start",
    },
    rowRight: {
        justifyContent: "flex-end",
    },
    bubble: {
        maxWidth: "80%",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 1,
    },
    bubbleOther: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 4,
    },
    bubbleMe: {
        backgroundColor: "#2E5E3E",
        borderTopRightRadius: 4,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    messageTextOther: {
        color: "#2E5E3E",
    },
    messageTextMe: {
        color: "#FFFFFF",
    },
    timeText: {
        fontSize: 11,
        marginTop: 6,
        alignSelf: "flex-end",
    },
    timeTextOther: {
        color: "#8AA88A",
    },
    timeTextMe: {
        color: "#D6F0D7",
    },
    inputRow: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: "flex-end",
        backgroundColor: "transparent",
    },
    input: {
        flex: 1,
        minHeight: 40,
        maxHeight: 120,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 8,
        color: "#2E5E3E",
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    sendButton: {
        marginLeft: 8,
        backgroundColor: "#2E5E3E",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    sendText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
});