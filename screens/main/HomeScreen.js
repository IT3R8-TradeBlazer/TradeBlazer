import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Image, SafeAreaView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";
import { getPosts } from "../../utils/storage";

export default function HomeScreen({ navigation }) {
  const defaultProducts = [
    {
      id: 1,
      name: "Ferro Rocher Bouquet",
      price: "₱1,100",
      image:
        "https://i.pinimg.com/1200x/2c/82/eb/2c82ebd17b033b757144f0b0c6da9e5a.jpg",
    },
    {
      id: 2,
      name: "Cake with Bows",
      price: "₱600",
      image:
        "https://i.pinimg.com/736x/72/bb/51/72bb51b23cf78b03d532234af0e6e9ae.jpg",
    },
    {
      id: 3,
      name: "Hair Clamps",
      price: "₱25",
      image:
        "https://i.pinimg.com/736x/5a/bc/1b/5abc1b02fc9539d7e969e3e8249ed53d.jpg",
    },
    {
      id: 4,
      name: "Teddy Bear",
      price: "₱600",
      image:
        "https://i.pinimg.com/736x/9b/78/0c/9b780ca25db2bce72b62acc72723ddb5.jpg",
    },
  ];

  const [products, setProducts] = useState(defaultProducts);

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await getPosts();
      setProducts([...posts.reverse(), ...defaultProducts]);
    };

    const unsubscribe = navigation.addListener("focus", loadPosts);
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} title="TradeBlazer" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#555"
          style={{ marginLeft: 10 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for anything..."
          placeholderTextColor="#888"
        />
      </View>

      {/* Products Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.screenTitle}>Products</Text>
      </View>

      {/* Products List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {products.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECF2E8" },

  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 25,
    elevation: 2,
  },
  searchInput: { flex: 1, paddingHorizontal: 10, color: "#333" },

  // Title
  titleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E5E3E",
  },

  // Product Cards
  scrollContent: { paddingHorizontal: 16, paddingBottom: 120 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
    overflow: "hidden",
  },
  image: { width: "100%", height: 180 },
  cardDetails: { padding: 15 },
  productName: { fontSize: 16, fontWeight: "600", color: "#2E5E3E" },
  productPrice: { fontSize: 14, color: "#444", marginTop: 4 },
});
