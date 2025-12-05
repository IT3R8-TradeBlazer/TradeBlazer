import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState({});
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    const loadMyId = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const parsed = JSON.parse(userData);
        setMyId(parsed.idNumber);

        const storedMessages = await AsyncStorage.getItem("messages");
        const allMessages = storedMessages ? JSON.parse(storedMessages) : {};
        setMessages({ [parsed.idNumber]: allMessages[parsed.idNumber] || {} });
      }
    };
    loadMyId();
  }, []);

  useEffect(() => {
    if (myId) {
      AsyncStorage.getItem("messages").then((stored) => {
        const allMessages = stored ? JSON.parse(stored) : {};
        allMessages[myId] = messages[myId];
        AsyncStorage.setItem("messages", JSON.stringify(allMessages));
      });
    }
  }, [messages, myId]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages, myId }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => useContext(MessagesContext);
