// context/MessagesContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState({});

  // Load persisted messages
  useEffect(() => {
    const loadMessages = async () => {
      const stored = await AsyncStorage.getItem("messages");
      if (stored) setMessages(JSON.parse(stored));
    };
    loadMessages();
  }, []);

  // Save messages every time they change
  useEffect(() => {
    AsyncStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => useContext(MessagesContext);
