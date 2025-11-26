import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function ChatListScreen({ navigation }) {
  const names = ["Synteche", "Cypress"];

  const goToChat = (name) => {
    try {
      const state = navigation.getState ? navigation.getState() : null;
      const routeNames = state?.routeNames || state?.routes?.map((r) => r.name) || [];
      const target = routeNames.includes("ChatScreen")
        ? "ChatScreen"
        : routeNames.includes("Chat")
        ? "Chat"
        : "ChatScreen";
      navigation.navigate(target, { name });
    } catch (e) {
      navigation.navigate("ChatScreen", { name });
    }
  };

  const renderItem = ({ item }) => {
    const initials = item
      .split(" ")
      .map((s) => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => goToChat(item)}
        activeOpacity={0.75}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.itemText}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} />

      {/* Main content */}
      <View style={styles.content}>
        <FlatList
          data={names}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
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
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#D6F0D7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#2E5E3E",
    fontWeight: "700",
    fontSize: 16,
  },
  nameContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    color: "#2E5E3E",
    fontWeight: "600",
  },
});
