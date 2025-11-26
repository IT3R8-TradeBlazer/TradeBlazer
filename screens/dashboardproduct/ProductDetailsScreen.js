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
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;

  const [photoUri, setPhotoUri] = useState(product.image);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="TradeBlazer" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.box}>
          {/* PHOTO + FAVORITE */}
          <View style={styles.photoRow}>
            <Image source={{ uri: photoUri }} style={styles.photo} />
            <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteBtn}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={28}
                color="red"
              />
            </TouchableOpacity>
          </View>

          {/* PRODUCT INFO (read-only) */}
          <Text style={styles.label}>Title</Text>
          <Text style={styles.info}>{product.name}</Text>

          <Text style={styles.label}>Price</Text>
          <Text style={styles.info}>{product.price}</Text>

          <Text style={styles.label}>Description</Text>
          <Text style={[styles.info, { minHeight: 80 }]}>{product.description || "-"}</Text>

          <Text style={styles.label}>Category</Text>
          <Text style={styles.info}>{product.category || "-"}</Text>

          {/* CONTACT SELLER */}
          <TouchableOpacity
            style={styles.contactBtn}
            onPress={() =>
              navigation.navigate("ChatScreen", { sellerId: product.sellerId })
            }
          >
            <Ionicons name="chatbubble-outline" size={20} color="#000" />
            <Text style={styles.contactText}>CONTACT SELLER</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECF2E8" },
  scrollContent: { padding: 15, paddingBottom: 150 },
  box: {
    backgroundColor: "#E6F2E6", // very light pastel green
    borderRadius: 15,
    padding: 15,
    elevation: 2,
  },
  photoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  photo: { width: "75%", height: 180, borderRadius: 15 },
  favoriteBtn: {
    marginLeft: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  label: { marginTop: 12, fontWeight: "bold", fontSize: 14 },
  info: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginTop: 4,
  },
  contactBtn: {
    marginTop: 20,
    backgroundColor: "#dcded6",
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  contactText: { fontWeight: "bold", fontSize: 14 },
});
