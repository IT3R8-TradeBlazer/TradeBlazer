import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/main/HomeScreen";
import NotificationsScreen from "../screens/notifications/NotificationsScreen";
import AddPostScreen from "../screens/post/AddPostScreen";
import ChatListScreen from "../screens/chat/ChatListScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import UserProfileScreen from "../screens/profile/UserProfileScreen";
import ReportUserScreen from "../screens/profile/ReportUserScreen";
import MenuSettingsScreen from "../screens/menu/MenuSettingsScreen";
import FavoritesScreen from "../screens/menu/FavoritesScreen";
import SettingsScreen from "../screens/menu/SettingsScreen";
import EditNameScreen from "../screens/menu/EditNameScreen";
import ChangeDisplayPhotoScreen from "../screens/menu/ChangeDisplayPhotoScreen";
import SupportAndInfoScreen from "../screens/menu/SupportAndInfoScreen";
import ChangePasswordScreen from "../screens/menu/ChangePasswordScreen";
import FAQScreen from "../screens/menu/FAQScreen";
import ChatScreen from "../screens/chat/ChatScreen";

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
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="ReportUser" component={ReportUserScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditName" component={EditNameScreen} />
      <Stack.Screen name="ChangeDisplayPhoto" component={ChangeDisplayPhotoScreen} />
      <Stack.Screen name="SupportAndInfo" component={SupportAndInfoScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}
