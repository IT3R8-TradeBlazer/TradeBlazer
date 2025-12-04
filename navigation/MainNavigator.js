import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import all screens used in the main app
import HomeScreen from "../screens/main/HomeScreen";
import CategoriesScreen from "../screens/main/CategoriesScreen";

import GiftsScreen from "../screens/main/GiftsScreen";
import SchoolSuppliesScreen from "../screens/main/SchoolSuppliesScreen";
import WomensApparelScreen from "../screens/main/WomensApparelScreen";
import MensApparelScreen from "../screens/main/MensApparelScreen";
import MobilesGadgetsScreen from "../screens/main/MobilesGadgetsScreen";
import HealthPersonalCareScreen from "../screens/main/HealthPersonalCareScreen";
import AccessoriesScreen from "../screens/main/AccessoriesScreen";
import FoodSnacksScreen from "../screens/main/FoodSnacksScreen";
import BooksScreen from "../screens/main/BooksScreen";
import HomeDecorScreen from "../screens/main/HomeDecorScreen";

import NotificationsScreen from "../screens/notifications/NotificationsScreen";
import AddPostScreen from "../screens/post/AddPostScreen";
import ChatListScreen from "../screens/chat/ChatListScreen";
import ChatScreen from "../screens/chat/ChatScreen";

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

import ProductDetailsScreen from "../screens/dashboardproduct/ProductDetailsScreen";

// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* MAIN APP (NO ANIMATION) */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ animation: "none" }}
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

      {/* CATEGORY SCREENS */}
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen name="GiftsScreen" component={GiftsScreen} />
      <Stack.Screen name="SchoolSuppliesScreen" component={SchoolSuppliesScreen} />
      <Stack.Screen name="WomensApparelScreen" component={WomensApparelScreen} />
      <Stack.Screen name="MensApparelScreen" component={MensApparelScreen} />
      <Stack.Screen name="MobilesGadgetsScreen" component={MobilesGadgetsScreen} />
      <Stack.Screen name="HealthPersonalCareScreen" component={HealthPersonalCareScreen} />
      <Stack.Screen name="AccessoriesScreen" component={AccessoriesScreen} />
      <Stack.Screen name="FoodSnacksScreen" component={FoodSnacksScreen} />
      <Stack.Screen name="BooksScreen" component={BooksScreen} />
      <Stack.Screen name="HomeDecorScreen" component={HomeDecorScreen} />

      {/* USER PROFILE + REPORT */}
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="ReportUser" component={ReportUserScreen} />

      {/* MENU SCREENS */}
      <Stack.Screen name="MenuSettings" component={MenuSettingsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditName" component={EditNameScreen} />

      {/* PROFILE PHOTO */}
      <Stack.Screen name="ChangeDisplayPhoto" component={ChangeDisplayPhotoScreen} />

      {/* INFO & SETTINGS */}
      <Stack.Screen name="SupportAndInfo" component={SupportAndInfoScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />

      {/* CHAT SCREEN */}
      <Stack.Screen name="ChatScreen" component={ChatScreen} />

      {/* PRODUCT DETAILS */}
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />

    </Stack.Navigator>
  );
}

