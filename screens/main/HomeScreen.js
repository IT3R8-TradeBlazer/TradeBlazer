import React, { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import BottomNav from "../../components/BottomNav";
import { PostsContext } from "../../context/PostsContext";

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Hardcoded default products
  const [products] = useState([
    {
      id: 1,
      name: "Ferrero Rocher Bouquet",
      price: "₱1,100",
      image:
        "https://i.pinimg.com/1200x/2c/82/eb/2c82ebd17b033b757144f0b0c6da9e5a.jpg",
      description:
        "A luxurious bouquet of Ferrero Rocher chocolates, perfect for gifting.",
      category: "Gift",
      isFavorite: false,
      sellerId: "syntyche",
      sellerName: "Syntyche",
    },
    {
      id: 2,
      name: "Cake with Bows",
      price: "₱600",
      image:
        "https://i.pinimg.com/736x/72/bb/51/72bb51b23cf78b03d532234af0e6e9ae.jpg",
      description:
        "A beautifully decorated cake adorned with elegant bows for any celebration.",
      category: "Gift",
      isFavorite: false,
      sellerId: "cypress",
      sellerName: "Cypress",
    },
    {
      id: 3,
      name: "Hair Clamps",
      price: "₱25",
      image:
        "https://i.pinimg.com/736x/5a/bc/1b/5abc1b02fc9539d7e969e3e8249ed53d.jpg",
      description:
        "A handy set of hair clamps to keep your hairstyles neat and stylish.",
      category: "Accessories",
      isFavorite: false,
      sellerId: "bryan",
      sellerName: "Bryan",
    },
    {
      id: 4,
      name: "Plush Teddy Bear",
      price: "₱600",
      image:
        "https://i.pinimg.com/736x/9b/78/0c/9b780ca25db2bce72b62acc72723ddb5.jpg",
      description: "A soft and cuddly teddy bear, ideal as a thoughtful gift.",
      category: "Gift",
      isFavorite: false,
      sellerId: "bryan",
      sellerName: "Bryan",
    },
  ]);

  // Posts from context
  const { posts } = useContext(PostsContext);

  // Combine posts + default products (avoid duplicates)
  const combinedProducts = useMemo(() => {
    const sortedPosts = [...posts].sort((a, b) => b.id - a.id);
    const filteredDefault = products.filter(
      (p) => !sortedPosts.some((sp) => sp.id === p.id)
    );
    return [...sortedPosts, ...filteredDefault];
  }, [posts, products]);

  // Apply search filter
  const filteredCombined = useMemo(
    () =>
      combinedProducts.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      ),
    [combinedProducts, searchText]
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setDropdownVisible(false);
      }}
    >
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} title="TradeBlazer" />

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

          {filteredCombined.length > 0 ? (
            filteredCombined.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("ProductDetailsScreen", {
                    product: item,
                  })
                }
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.cardDetails}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResult}>No matching items found.</Text>
          )}
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
    overflow: "hidden",
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
  noResult: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    fontSize: 16,
  },
});
