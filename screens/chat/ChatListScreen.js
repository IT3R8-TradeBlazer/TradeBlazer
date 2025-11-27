import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function ChatListScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const names = ["Syntyche", "Cypress", "Bryan"];

  // Filter names based on search input
  const filtered = names.filter((n) =>
    n.toLowerCase().includes(search.toLowerCase())
  );

  const goToChat = (name) => navigation.navigate("ChatScreen", { name });

  const renderItem = ({ item }) => {
    const initials = item[0].toUpperCase();
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => goToChat(item)}
        activeOpacity={0.75}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed App Header */}
      <Header navigation={navigation} title="TradeBlazer" />

      {/* Screen-specific title */}
      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitle}>Chats</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={18}
          color="#555"
          style={{ marginLeft: 10 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search…"
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Chat List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      />

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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: "#D6F0D7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E5E3E",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2E5E3E",
  },
});
