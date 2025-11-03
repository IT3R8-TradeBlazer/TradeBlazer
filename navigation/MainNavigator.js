import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/main/HomeScreen";
import NotificationsScreen from "../screens/notifications/NotificationsScreen";
import AddPostScreen from "../screens/post/AddPostScreen";
import ChatListScreen from "../screens/chat/ChatListScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import MenuSettingsScreen from "../screens/menu/MenuSettingsScreen";
import FavoritesScreen from '../screens/menu/FavoritesScreen';
import SettingsScreen from '../screens/menu/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="AddPost" component={AddPostScreen} />
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MenuSettings" component={MenuSettingsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />

    </Stack.Navigator>
  );
}
