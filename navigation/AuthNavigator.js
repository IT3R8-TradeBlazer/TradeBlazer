import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/auth/SignInScreen";
import RegistrationScreen from "../screens/auth/RegistrationScreen";
import MainNavigator from "./MainNavigator";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />

      {/* ✅ renamed "Home" to "Main" to avoid duplication */}
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
}
