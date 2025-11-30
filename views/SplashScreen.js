import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/lo.png")} // your logo
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eBecf4", // same splash bg color as app
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200, // adjust size
    height: 200,
  },
});
