// context/MessagesContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create a context so we can share messages across the entire app
const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  // Global state that stores all chat messages
  // Example structure:
  // { chatId1: [...messages], chatId2: [...messages] }
  const [messages, setMessages] = useState({});

  // ------------------------------------------------------------------
  // LOAD SAVED MESSAGES FROM STORAGE WHEN THE APP STARTS
  // ------------------------------------------------------------------
  useEffect(() => {
    const loadMessages = async () => {
      // Get the saved "messages" value from AsyncStorage
      const stored = await AsyncStorage.getItem("messages");

      // If data exists, convert it from JSON string → object
      if (stored) setMessages(JSON.parse(stored));
    };

    // Call the function once when the provider mounts
    loadMessages();
  }, []);

  // ------------------------------------------------------------------
  // SAVE MESSAGES TO STORAGE EVERY TIME THEY CHANGE
  // This ensures chats are not lost when the app closes.
  // ------------------------------------------------------------------
  useEffect(() => {
    // Convert object → JSON string and store it
    AsyncStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]); // Runs every time "messages" state updates

  // ------------------------------------------------------------------
  // PROVIDE VALUES TO ANY COMPONENT THAT USES THIS CONTEXT
  // components can access:
  //   - messages (all chat data)
  //   - setMessages (to update chats)
  // ------------------------------------------------------------------
  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};

// Custom hook so components can easily access the messages context
export const useMessages = () => useContext(MessagesContext);
