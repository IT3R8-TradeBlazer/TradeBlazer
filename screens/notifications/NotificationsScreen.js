import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function NotificationsScreen({ navigation }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName"); // saved from Registration
        if (storedName) setUserName(storedName);
      } catch (error) {
        console.log("Error loading name:", error);
      }
    };

    loadUserName();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} />

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Notifications</Text>

        <View style={styles.notificationCard}>
          <Text style={styles.notificationGreeting}>
            Welcome to TradeBlazer!
          </Text>

          <Text style={styles.notificationBody}>
            We're excited to have you on board.{"\n"}
          </Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF2E8",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#000",
  },
  notificationCard: {
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  notificationGreeting: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },
  notificationBody: {
    fontSize: 15,
    fontWeight: "400",
    color: "#444",
    lineHeight: 22,
  },
});
