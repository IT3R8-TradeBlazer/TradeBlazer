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

export default function AccessoriesScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const closeDropdown = () => setDropdownVisible(false);

  const filteredProducts = products.filter(
    (item) =>
      item.category.toLowerCase() === "accessories" &&
      item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={closeDropdown}>
        <View style={{ flex: 1 }}>
          <Header title="Accessories" />

          <SearchBar
            navigation={navigation}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search Accessories"
            showDropdown={dropdownVisible}
            setShowDropdown={setDropdownVisible}
          />

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.sectionTitle}>Accessories</Text>

            {filteredProducts.length === 0 ? (
              <Text style={styles.noResult}>No matching items found.</Text>
            ) : (
              filteredProducts.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("ProductDetails", { product: item })
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
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
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
    fontSize: 16,
  },
});
