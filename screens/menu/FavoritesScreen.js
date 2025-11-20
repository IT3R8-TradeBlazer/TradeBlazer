import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { Ionicons } from "@expo/vector-icons";

export default function FavoritesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      {/* Main Header */}
      <Header navigation={navigation} />

      {/* Page Content */}
      <View style={styles.content}>

        {/* Back + Title Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#2E5E3E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Favorites</Text>
        </View>

        {/* Product Grid */}
        <ScrollView contentContainerStyle={styles.grid}>

          {/* Item 1 */}
          <TouchableOpacity style={styles.card}>
            <Image
              source={{ uri: "https://i.pinimg.com/736x/72/bb/51/72bb51b23cf78b03d532234af0e6e9ae.jpg" }}
              style={styles.image}
            />
            <Text style={styles.name}>Cake with Bows</Text>
            <Text style={styles.price}>₱600</Text>
          </TouchableOpacity>

          {/* Item 2 */}
          <TouchableOpacity style={styles.card}>
            <Image
              source={{ uri: "https://i.pinimg.com/1200x/2c/82/eb/2c82ebd17b033b757144f0b0c6da9e5a.jpg" }}
              style={styles.image}
            />
            <Text style={styles.name}>Ferro Rocher Bouquet</Text>
            <Text style={styles.price}>₱1,100</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF2E8",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E5E3E",
    marginLeft: 6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  card: {
    backgroundColor: "white",
    width: "48%",
    borderRadius: 10,
    paddingBottom: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 120,
    backgroundColor: "#ddd",
  },
  name: {
    fontSize: 16,
    marginTop: 6,
    marginLeft: 6,
    color: "#2C4B23",
  },
  price: {
    fontSize: 14,
    opacity: 0.7,
    marginLeft: 6,
    color: "#2C4B23",
  },
});

