import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";

import { MessagesProvider } from "./context/MessagesContext";
import { PostsProvider } from "./context/PostsContext";
import { FavoritesProvider } from "./src/context/FavoritesContext";

import SplashScreen from "./views/SplashScreen";
import * as ExpoSplashScreen from "expo-splash-screen";

export default function App() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  // Auto-hide your JS splash after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplashScreen(false);
      ExpoSplashScreen.hideAsync(); // ⬅ THIS MAKES YOUR SPLASH VISIBLE
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PostsProvider>
      <MessagesProvider>
        <FavoritesProvider>
          {isShowSplashScreen ? (
            <SplashScreen />
          ) : (
            <NavigationContainer>
              <AuthNavigator />
            </NavigationContainer>
          )}
        </FavoritesProvider>
      </MessagesProvider>
    </PostsProvider>
  );
}
