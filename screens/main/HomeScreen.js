import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import BottomNav from "../../components/BottomNav";
import { PostsContext } from "../../context/PostsContext";

export default function HomeScreen({ navigation }) {
  // === ScreensDashboard states ===
  const [searchText, setSearchText] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // === ScreensDashboard product state ===
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

  // === ScreensDashboard update logic ===
  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  // === ScreensDashboard filter logic ===
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // === HEAD logic with PostsContext ===
  const defaultProducts = [...products]; // keep existing products
  const { posts } = useContext(PostsContext);

  // Sort posts by newest
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  // Combine newest posts + defaultProducts
  const combinedProducts = [...sortedPosts, ...defaultProducts];

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setDropdownVisible(false);
      }}
    >
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} title="TradeBlazer" />

        {/* ScreensDashboard SearchBar */}
        <SearchBar
          navigation={navigation}
          value={searchText}
          onChangeText={setSearchText}
          showDropdown={dropdownVisible}
          setShowDropdown={setDropdownVisible}
          placeholder="Search for anything..."
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionTitle}>Products</Text>

          {/* HEAD combinedProducts logic (posts + default)  
              but apply search filtering (ScreensDashboard) */}
          {combinedProducts
            .filter((item) =>
              item.name.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("ProductDetailsScreen", {
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

          {filteredProducts.length === 0 && combinedProducts.length === 0 && (
            <Text style={styles.noResult}>No matching items found.</Text>
          )}
        </ScrollView>

        <BottomNav navigation={navigation} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECF2E8" },

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
  },

  image: { width: "100%", height: 180 },

  cardDetails: { padding: 15 },

  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E5E3E",
  },

  productPrice: { fontSize: 14, color: "#444", marginTop: 4 },

  noResult: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    fontSize: 16,
  },
});
