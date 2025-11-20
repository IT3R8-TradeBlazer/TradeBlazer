import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Main Header */}
      <Header navigation={navigation} />

      {/* Screen Title + Back */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#2E5E3E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("EditName")}>
          <View style={styles.itemRow}>
            <Ionicons name="pencil" size={20} color="#2C4B23" />
            <Text style={styles.text}>Edit Name</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("ChangeDisplayPhoto")}>
          <View style={styles.itemRow}>
            <Ionicons name="image" size={20} color="#2C4B23" />
            <Text style={styles.text}>Change Display Photo</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("ChangePassword")}>
          <View style={styles.itemRow}>
            <Ionicons name="lock-closed" size={20} color="#2C4B23" />
            <Text style={styles.text}>Change Password</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />

      </View>

      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{ 
    flex:1, 
    backgroundColor:"#ECF2E8",
  },
  headerRow:{
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerTitle:{ 
    fontSize:22, 
    fontWeight:"bold",
    color:"#2E5E3E",
    marginLeft: 6,
  },
  content:{
    flex:1,
    paddingHorizontal:20,
    marginTop:10,
  },
  item: {
    paddingVertical: 12,
  },
  itemRow:{
    flexDirection: "row",
    alignItems: "center",
  },
  text:{ 
    fontSize:18, 
    color:"#2C4B23",
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#2C4B23",
    opacity: 0.4,
  },
});

