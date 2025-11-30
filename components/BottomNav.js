import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BottomNav({ navigation }) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Ionicons name="home" size={26} color="#ECF2E8" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
        <Ionicons name="notifications" size={26} color="#ECF2E8" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddPost")}
      >
        <Ionicons name="add" size={30} color="#2E5E3E" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ChatList")}>
        <Ionicons name="chatbubbles" size={26} color="#ECF2E8" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Ionicons name="person" size={26} color="#ECF2E8" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#2E5E3E",
    paddingVertical: 12,
    position: "absolute",
    bottom: 0,
    width: "100%",
    elevation: 10,
  },
  addButton: {
    backgroundColor: "#ECF2E8",
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
  },
});
