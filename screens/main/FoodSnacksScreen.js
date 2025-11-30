import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";

import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import BottomNav from "../../components/BottomNav";

import products from "../../data/products";

export default function FoodSnacksScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const closeDropdown = () => setDropdownVisible(false);

  const foodProducts = products.filter(
    (item) =>
      item.category.toLowerCase() === "food & snacks" &&
      item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <SafeAreaView style={styles.container}>
        <Header title="Food & Snacks" navigation={navigation} />

        <SearchBar
          navigation={navigation}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search Food & Snacks..."
          showDropdown={dropdownVisible}
          setShowDropdown={setDropdownVisible}
        />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Food & Snacks</Text>

          {foodProducts.length === 0 ? (
            <Text style={styles.noResult}>No matching items found.</Text>
          ) : (
            foodProducts.map((item) => (
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
    marginVertical: 10,
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
  },
});
