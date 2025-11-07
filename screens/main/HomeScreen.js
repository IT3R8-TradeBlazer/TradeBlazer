import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import ProductCard from "../../components/ProductCard";

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    {
      id: 1,
      name: "Ferro Rocher Bouquet",
      price: "1,100",
      image:
        "https://i.pinimg.com/1200x/2c/82/eb/2c82ebd17b033b757144f0b0c6da9e5a.jpg",
    },
    {
      id: 2,
      name: "Cake with Bows",
      price: "600",
      image:
        "https://i.pinimg.com/736x/72/bb/51/72bb51b23cf78b03d532234af0e6e9ae.jpg",
    },
    {
      id: 3,
      name: "Hair Clamps",
      price: "25",
      image:
        "https://i.pinimg.com/736x/5a/bc/1b/5abc1b02fc9539d7e969e3e8249ed53d.jpg",
    },
    {
      id: 4,
      name: "Teddy Bear",
      price: "600",
      image:
        "https://i.pinimg.com/736x/9b/78/0c/9b780ca25db2bce72b62acc72723ddb5.jpg",
    },
  ];

  const filtered = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="TradeBlazer" />
      <SearchBar
        placeholder="Search for anything..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.categoryContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoryRow}>
          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() =>
              navigation.navigate("Category", { categoryName: "Gifts" })
            }
          >
            <Ionicons name="gift-outline" size={22} color="#2E5E3E" />
            <Text style={styles.categoryText}>Gifts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() =>
              navigation.navigate("Category", { categoryName: "Electronics" })
            }
          >
            <Ionicons name="laptop-outline" size={22} color="#2E5E3E" />
            <Text style={styles.categoryText}>Electronics</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Products</Text>
        {filtered.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </ScrollView>
      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF2E8",
  },
  categoryContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 10,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  categoryText: {
    marginLeft: 6,
    fontWeight: "600",
    color: "#2E5E3E",
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 120,
  },
});
