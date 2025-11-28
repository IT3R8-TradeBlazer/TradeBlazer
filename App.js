import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";
import { MessagesProvider } from "./context/MessagesContext";
import { PostsProvider } from "./context/PostsContext"; // <- added

export default function App() {
  return (
    <PostsProvider>
      <MessagesProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </MessagesProvider>
    </PostsProvider>
  );
}
