import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import BottomNav from "../../components/BottomNav";

// Shared products data
import products from "../../data/products";

export default function SchoolSuppliesScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter school supplies
  const schoolProducts = useMemo(
    () => products.filter((item) => item.category === "School Supplies"),
    []
  );

  // Filter search results
  const filteredProducts = schoolProducts.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setShowDropdown(false); // Close dropdown when tapping outside
      }}
    >
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} title="School Supplies" />

        {/* Search Bar */}
        <SearchBar
          placeholder="Search School Supplies"
          value={searchText}
          onChangeText={setSearchText}
          navigation={navigation}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionTitle}>School Supplies</Text>

          {/* No results */}
          {filteredProducts.length === 0 && (
            <Text style={styles.noResults}>No matching items found.</Text>
          )}

          {/* Product list */}
          {filteredProducts.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <BottomNav navigation={navigation} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF2E8",
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  noResults: {
    marginTop: 20,
    fontSize: 15,
    color: "#666",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 180,
  },
  cardDetails: {
    padding: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E5E3E",
  },
  productPrice: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
});
