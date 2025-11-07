import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import SearchBar from "../../components/SearchBar";
import ProductCard from "../../components/ProductCard";

export default function CategoryScreen() {
  const route = useRoute();
  const { categoryName } = route.params || {};
  const [searchQuery, setSearchQuery] = useState("");

  const allProducts = [
    {
      id: 1,
      name: "Ferro Rocher Bouquet",
      price: "1,100",
      image:
        "https://i.pinimg.com/1200x/2c/82/eb/2c82ebd17b033b757144f0b0c6da9e5a.jpg",
      category: "Gifts",
    },
    {
      id: 2,
      name: "Cake with Bows",
      price: "600",
      image:
        "https://i.pinimg.com/736x/72/bb/51/72bb51b23cf78b03d532234af0e6e9ae.jpg",
      category: "Gifts",
    },
    {
      id: 3,
      name: "Hair Clamps",
      price: "25",
      image:
        "https://i.pinimg.com/736x/5a/bc/1b/5abc1b02fc9539d7e969e3e8249ed53d.jpg",
      category: "Accessories",
    },
    {
      id: 4,
      name: "Teddy Bear",
      price: "600",
      image:
        "https://i.pinimg.com/736x/9b/78/0c/9b780ca25db2bce72b62acc72723ddb5.jpg",
      category: "Gifts",
    },
  ];

  const filteredCategory = allProducts.filter(
    (item) => item.category === categoryName
  );

  const filteredResults = filteredCategory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{categoryName}</Text>
      <SearchBar
        placeholder={`Search in ${categoryName}...`}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found.</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
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
