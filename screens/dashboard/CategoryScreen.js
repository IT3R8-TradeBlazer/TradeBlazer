import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import SearchBar from "../../components/SearchBar";
import ProductCard from "../../components/ProductCard";

export default function CategoryScreen() {
  const route = useRoute();
  const { categoryName } = route.params || {};
  const [searchQuery, setSearchQuery] = useState("");

  const allProducts = [];

  const filteredCategory = allProducts.filter(
    (p) => p.category === categoryName
  );

  const filteredResults = filteredCategory.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoryName}</Text>
      <SearchBar
        placeholder={`Search in ${categoryName}...`}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items found.</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF2E8",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E5E3E",
    marginTop: 15,
    marginBottom: 5,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },
});
