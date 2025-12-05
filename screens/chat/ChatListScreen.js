import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import SearchBar from "../../components/SearchBar";

export default function ChatListScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const users = [
    { idNumber: "001", name: "Syntyche" },
    { idNumber: "002", name: "Cypress" },
    { idNumber: "003", name: "Bryan" },
  ];

  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const goToChat = (contact) =>
    navigation.navigate("ChatScreen", { idNumber: contact.idNumber, name: contact.name });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => goToChat(item)}
      activeOpacity={0.75}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.name ? item.name[0].toUpperCase() : "?"}
        </Text>
      </View>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="TradeBlazer" />

      <SearchBar
        navigation={navigation}
        value={search}
        onChangeText={setSearch}
        showDropdown={dropdownVisible}
        setShowDropdown={setDropdownVisible}
        placeholder="Search for anything…"
      />

      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitle}>Chats</Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.idNumber}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      />

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECF2E8" },
  screenTitleContainer: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 },
  screenTitle: { fontSize: 20, fontWeight: "700", color: "#2E5E3E" },
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
  avatarText: { fontSize: 18, fontWeight: "700", color: "#2E5E3E" },
  itemText: { fontSize: 18, fontWeight: "600", color: "#2E5E3E" },
});
