// context/MessagesContext.js
import React, { createContext, useState, useContext } from "react";

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  // Store messages per contact: { contactName: [message1, message2, ...] }
  const [messages, setMessages] = useState({});

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => useContext(MessagesContext);
