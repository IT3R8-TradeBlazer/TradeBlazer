import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search for anything...",
  navigation,
  showDropdown,
  setShowDropdown,
}) {
  return (
    <View style={{ position: "relative" }}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#555" style={{ marginLeft: 10 }} />

        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor="#888"
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setShowDropdown(true)}
        />
      </View>

      {showDropdown && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              navigation.navigate("CategoriesScreen");
              setShowDropdown(false);
            }}
          >
            <Text style={styles.dropdownText}>Categories</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              navigation.navigate("GiftsScreen");
              setShowDropdown(false);
            }}
          >
            <Text style={styles.dropdownText}>Gifts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              navigation.navigate("SchoolSuppliesScreen");
              setShowDropdown(false);
            }}
          >
            <Text style={styles.dropdownText}>School Supplies</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              navigation.navigate("AccessoriesScreen");
              setShowDropdown(false);
            }}
          >
            <Text style={styles.dropdownText}>Accessories</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 15,
    paddingVertical: 8,
    borderRadius: 25,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: "#333",
  },
  dropdown: {
    position: "absolute",
    top: 70,
    left: 15,
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 5,
    paddingVertical: 5,
    zIndex: 999,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 15,
    color: "#333",
  },
});
