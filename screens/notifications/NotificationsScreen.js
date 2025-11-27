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
      {/* Fixed Header */}
      <Header navigation={navigation} title="TradeBlazer" />

      {/* Screen-specific title */}
      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitle}>Notifications</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.notificationCard}>
          <Text style={styles.notificationGreeting}>
            Welcome to TradeBlazer!
          </Text>

          <Text style={styles.notificationBody}>
            We're excited to have you on board.{"\n"}
          </Text>
        </View>
      </View>

      {/* Fixed BottomNav */}
      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF2E8",
  },
  screenTitleContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E5E3E",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  notificationCard: {
    backgroundColor: "#D6F0D7", // match other product/chat cards
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
  },
  notificationGreeting: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E5E3E",
    marginBottom: 6,
  },
  notificationBody: {
    fontSize: 14,
    fontWeight: "400",
    color: "#444",
    lineHeight: 20,
  },
});
