import React, { useState, useContext } from "react";
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
import { PostsContext } from "../../context/PostsContext";

export default function WomensApparelScreen({ navigation }) {
  const { posts } = useContext(PostsContext); // 🔥 Live posts from context
  const [searchText, setSearchText] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // 🔥 Filter posts by "Women's Apparel" category and search text
  const filteredProducts = posts.filter(
    (item) =>
      item.category.toLowerCase() === "women's apparel" &&
      item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setDropdownVisible(false);
      }}
    >
      <SafeAreaView style={styles.container}>
        <Header title="Women's Apparel" navigation={navigation} />

        <SearchBar
          navigation={navigation}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search Women's Apparel"
          showDropdown={dropdownVisible}
          setShowDropdown={setDropdownVisible}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionTitle}>Women's Apparel</Text>

          {filteredProducts.length === 0 && (
            <Text style={styles.noResults}>No matching items found.</Text>
          )}

          {filteredProducts.map((item) => (
            <TouchableWithoutFeedback
              key={item.id}
              onPress={() =>
                navigation.navigate("ProductDetails", { product: item })
              }
            >
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.cardDetails}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
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
