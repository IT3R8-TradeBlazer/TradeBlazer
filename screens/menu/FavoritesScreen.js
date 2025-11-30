import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../../src/context/FavoritesContext";

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#2E5E3E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Favorites</Text>
        </View>

        <ScrollView contentContainerStyle={styles.grid}>
          {favorites.length === 0 ? (
            <Text style={styles.empty}>No favorites yet.</Text>
          ) : (
            favorites.map((item) => (
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
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>

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
  empty: {
    fontSize: 18,
    color: "#666",
    marginTop: 20,
    textAlign: "center",
    width: "100%",
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
