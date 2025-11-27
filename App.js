import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import { MessagesProvider } from './context/MessagesContext'; // Import provider

export default function App() {
  return (
    <MessagesProvider>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </MessagesProvider>
  );
}
