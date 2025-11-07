import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";

export default function HomeScreen({ navigation }) {
  const products = [
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

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="TradeBlazer" />
      <View style={styles.categoryContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoryRow}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() =>
              navigation.navigate("Category", { categoryName: "Gifts" })
            }
          >
            <Ionicons name="gift-outline" size={22} color="#2E5E3E" />
            <Text style={styles.categoryText}>Gifts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() =>
              navigation.navigate("Category", { categoryName: "Accessories" })
            }
          >
            <MaterialIcons name="watch" size={22} color="#2E5E3E" />
            <Text style={styles.categoryText}>Accessories</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Products</Text>
        {products.map((item) => (
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
    marginTop: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    color: "#2E5E3E",
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 2,
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#2E5E3E",
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 120,
  },
});
