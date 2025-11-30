import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
}
