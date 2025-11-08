import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function NotificationsScreen({ navigation }) {
  // Example notifications
  const notifications = [
    {
      id: 1,
      message: "Cypress Bullo added your post to her favorites.",
    },
    {
      id: 2,
      message: "John Dalisay added your post to his favorites.",
    },
    {
      id: 3,
      message: "Tracey Ocampo commented: 'This is so cute!' on your post.",
    },
    {
      id: 4,
      message: "Your post ‘Teddy Bear’ has received 10 likes!",
    },
    {
      id: 5,
      message: "Kingmark Reyes shared your post.",
    },
    {
      id: 6,
      message: "Johann Cruz mentioned you in a comment.",
    },
    {
      id: 7,
      message: "Your new post ‘Cake with Bows’ is now live!",
    },
    {
      id: 8,
      message: "A user sent you a message about your ‘Hair Clamps’ post.",
    },
    {
      id: 9,
      message: "You have a new follower: Alexa Mendoza.",
    },
    {
      id: 10,
      message: "System: TradeBlazer will undergo maintenance tonight at 10 PM.",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} />

      {/* Notifications content */}
      <View style={styles.content}>
        <Text style={styles.title}>Notifications</Text>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {notifications.map((item) => (
            <View key={item.id} style={styles.notificationCard}>
              <Text style={styles.notificationText}>{item.message}</Text>
            </View>
          ))}
        </ScrollView>
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
    color: "#000000",
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  notificationCard: {
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  notificationText: {
    fontSize: 14,
    color: "#333333",
  },
});
