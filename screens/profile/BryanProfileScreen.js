import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';

export default function SyntycheProfileScreen({ navigation }) {
  const user = {
    name: 'Bryan',
    department: 'Information Technology',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq7TjvyTn8KqIvO8qFGquQe-jKIfFj0CwSqw&s',
    address: 'Cagayan de Oro, Philippines',
    email: 'bryan@example.com',
    phone: '09171234128',
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <Header navigation={navigation} title="TradeBlazer" />

      {/* BACK + REPORT ICON ROW */}
      <View style={styles.headerRow}>
        {/* BACK BUTTON */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#2E5E3E" />
        </TouchableOpacity>

        {/* REPORT ICON */}
        <TouchableOpacity onPress={() => navigation.navigate("ReportUser")}>
          <Ionicons name="flag-outline" size={24} color="#d32f2f" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
      >

        {/* PROFILE SECTION */}
        <View style={styles.profileSection}>
        <Image source={{ uri: user.photo }} style={styles.profilePic} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.subtext}>{user.department} | Student</Text>

        {/* CONTACT BUTTON navigates to ChatScreen */}
        <TouchableOpacity
            style={styles.contactBtn}
            onPress={() => navigation.navigate("ChatScreen", { name: user.name })}
        >
            <Text style={styles.btnText}>CONTACT</Text>
        </TouchableOpacity>
        </View>


        {/* ABOUT & CONTACT INFO */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>About</Text>
          <Text>{user.address}</Text>

          <Text style={styles.label}>Contact</Text>
          <Text>{user.email}</Text>
          <Text>{user.phone}</Text>
        </View>
      </ScrollView>

      {/* BOTTOM NAV */}
      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF2E8",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: -10,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E3E',
  },
  subtext: {
    color: '#777',
    marginTop: 2,
    marginBottom: 12,
  },
  contactBtn: {
    backgroundColor: '#2e7d32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoSection: {
    marginVertical: 20,
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: "#2E5E3E",
  },
});
