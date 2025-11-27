import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header({ title = "TradeBlazer" }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Title on the left */}
      <Text style={styles.logo}>{title}</Text>

      {/* Menu button on the right */}
      <TouchableOpacity onPress={() => navigation.navigate("MenuSettings")}>
        <Ionicons name="menu" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2E5E3E",
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    paddingTop: 28,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
