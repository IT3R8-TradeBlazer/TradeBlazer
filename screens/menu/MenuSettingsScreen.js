import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function MenuScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top App Header */}
      <Header navigation={navigation} />

      {/* Menu Header Row */}
      <View style={styles.menuHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#2E5E3E" />
        </TouchableOpacity>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate("Favorites")}
        >
          <View style={styles.menuRow}>
            <FontAwesome name="heart" size={20} color="#2C4B23" />
            <Text style={styles.menuText}>Favorites</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate("Settings")}
        >
          <View style={styles.menuRow}>
            <Ionicons name="settings-sharp" size={20} color="#2C4B23" />
            <Text style={styles.menuText}>Account Settings</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate("SupportAndInfo")}
        >
          <View style={styles.menuRow}>
            <Ionicons name="information-circle-outline" size={20} color="#2C4B23" />
            <Text style={styles.menuText}>Support & Info</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.divider} />        
        
      </View>

      {/* Bottom Nav */}
      <BottomNav navigation={navigation} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF2E8",
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E5E3E",
    marginLeft: 6,
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 18,
    color: "#2C4B23",
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#2C4B23",
    opacity: 0.4,
  },
});
