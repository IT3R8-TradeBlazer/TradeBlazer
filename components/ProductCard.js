import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProductCard({ product }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { product })}
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 8,
        elevation: 2,
        overflow: "hidden",
      }}
    >
      <Image
        source={{ uri: product.image }}
        style={{ height: 180, width: "100%" }}
        resizeMode="cover"
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {product.name}
        </Text>
        <Text style={{ color: "#2E5E3E", fontSize: 14 }}>₱{product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}
