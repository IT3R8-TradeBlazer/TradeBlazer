import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import all screens used in the main app
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

// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    // Hide all default headers from React Navigation
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* -------------------------------------------
          MAIN APP SCREENS (NO ANIMATION)
          These are the core tabs/screens of the app.
          No sliding animation when navigating.
      -------------------------------------------- */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ animation: "none" }}  // Disable transition animation
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ animation: "none" }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{ animation: "none" }}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{ animation: "none" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ animation: "none" }}
      />

      {/* -------------------------------------------
          EXTRA SCREENS (DEFAULT ANIMATION)
          These use normal slide animations since they
          behave like separate pages or settings screens.
      -------------------------------------------- */}

      {/* View another user's profile */}
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />

      {/* Report a user */}
      <Stack.Screen name="ReportUser" component={ReportUserScreen} />

      {/* Menu screens */}
      <Stack.Screen name="MenuSettings" component={MenuSettingsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditName" component={EditNameScreen} />

      {/* Change profile photo */}
      <Stack.Screen name="ChangeDisplayPhoto" component={ChangeDisplayPhotoScreen} />

      {/* App information pages */}
      <Stack.Screen name="SupportAndInfo" component={SupportAndInfoScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />

      {/* Chat screen for individual conversations */}
      <Stack.Screen name="ChatScreen" component={ChatScreen} />

    </Stack.Navigator>
  );
}
