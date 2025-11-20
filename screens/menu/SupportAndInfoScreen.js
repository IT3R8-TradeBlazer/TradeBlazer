import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function SupportAndInfoScreen() {
  const navigation = useNavigation();

  const handleComingSoon = () => {
    Alert.alert("Coming Soon!", "This feature is not available yet.", [{ text: "OK" }]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      {/* Back + Title */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#2E5E3E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support & Info</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>

        {/* FAQ */}
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("FAQ")}>
        <View style={styles.itemRow}>
            <Ionicons name="help-circle-outline" size={20} color="#2C4B23" />
            <Text style={styles.text}>FAQ</Text>
        </View>
        </TouchableOpacity>

        {/* Contact Support */}
        <TouchableOpacity style={styles.item} onPress={handleComingSoon}>
          <View style={styles.itemRow}>
            <Ionicons name="mail" size={20} color="#2C4B23" />
            <Text style={styles.text}>Contact Support</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />

        {/* Report a Problem */}
        <TouchableOpacity style={styles.item} onPress={handleComingSoon}>
          <View style={styles.itemRow}>
            <Ionicons name="alert-circle-outline" size={20} color="#2C4B23" />
            <Text style={styles.text}>Report a Problem</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />

        {/* App Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>App Information</Text>
          <Text style={styles.infoText}>Version: 1.0.0</Text>
          <Text style={styles.infoText}>Developed by: TradeBlazer Team</Text>
        </View>

      </View>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECF2E8" },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#2E5E3E",
    marginLeft: 6
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  item: {
    paddingVertical: 12,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#2C4B23",
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#2C4B23",
    opacity: 0.4,
  },
  infoBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#DCE8D3",
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2E5E3E",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: "#2C4B23",
  }
});