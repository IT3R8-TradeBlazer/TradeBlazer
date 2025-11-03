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
      
      {/* ✅ Global Header */}
      <Header navigation={navigation} />

      {/* ✅ Screen Title + Back */}
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#2C4B23" />
        </TouchableOpacity>
        <Text style={styles.title}>Account Settings</Text>
      </View>

      {/* ✅ Content */}
      <View style={styles.content}>

        <TouchableOpacity 
          style={styles.item} 
          onPress={() => navigation.navigate("EditName")}
        >
          <Text style={styles.text}>✏️  Edit Name</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.item} 
          onPress={() => navigation.navigate("ChangePhoto")}
        >
          <Text style={styles.text}>🖼️  Change Display Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.item} 
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={styles.text}>🔒  Change Password</Text>
        </TouchableOpacity>

      </View>

      {/* ✅ Bottom Navigation */}
      <BottomNav navigation={navigation} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{ 
    flex:1, 
    backgroundColor:"#ECF2E8",
  },
  titleRow:{
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  title:{ 
    fontSize:20, 
    fontWeight:"bold",
    color:"#2C4B23",
    marginLeft: 5,
  },
  content:{
    flex:1,
    paddingHorizontal:15,
    marginTop:5,
  },
  item:{ 
    paddingVertical:15, 
    borderBottomWidth:1, 
    borderColor:"#2C4B23",
  },
  text:{ 
    fontSize:16, 
    color:"#2C4B23" 
  },
});
