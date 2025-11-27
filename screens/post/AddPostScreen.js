import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import BottomNav from "../../components/BottomNav"; 

export default function AddPostScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.text}>ADD POST</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E5E3E",
  },
});
