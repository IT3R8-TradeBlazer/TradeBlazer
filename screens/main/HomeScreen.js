import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";

export default function HomeScreen({ navigation }) {
  const [showDropdown, setShowDropdown] = useState(false);

  // Make products a state to allow updates
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Ferro Rocherrrr Bouquet",
      price: "₱1,100",
      image:
        "https://i.pinimg.com/1200x/2c/82/eb/2c82ebd17b033b757144f0b0c6da9e5a.jpg",
      description: "Blah blah baahvdhwvf",
      category: "Gift",
      isFavorite: false,
    },
    {
      id: 2,
      name: "Cake with Bows",
      price: "₱600",
      image:
        "https://i.pinimg.com/736x/72/bb/51/72bb51b23cf78b03d532234af0e6e9ae.jpg",
      description: "Blah dasdafaff",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Hair Clamps",
      price: "₱25",
      image:
        "https://i.pinimg.com/736x/5a/bc/1b/5abc1b02fc9539d7e969e3e8249ed53d.jpg",
      description: "kapoy na",
      isFavorite: false,
    },
    {
      id: 4,
      name: "Teddy Bear",
      price: "₱600",
      image:
        "https://i.pinimg.com/736x/9b/78/0c/9b780ca25db2bce72b62acc72723ddb5.jpg",
      description: "rawrrawrrr",
      isFavorite: false,
    },
  ]);

  // Function to update a single product
  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="TradeBlazer" />

      <View>
        <SearchBar navigation={navigation} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>Products</Text>

        {products.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("ProductDetails", {
                product: item,
                updateProduct: updateProduct,
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
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
    position: "relative",
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
