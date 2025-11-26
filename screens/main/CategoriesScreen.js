import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";

const categories = [
  { title: 'School Supplies', icon: 'school-outline', screen: 'SchoolSuppliesScreen' },
  { title: "Women's Apparel", icon: 'woman-outline', screen: 'WomensApparelScreen' },
  { title: "Men's Apparel", icon: 'shirt-outline', screen: 'MensApparelScreen' },
  { title: 'Mobiles & Gadgets', icon: 'phone-portrait-outline', screen: 'MobilesGadgetsScreen' },
  { title: 'Health & Personal Care', icon: 'medkit-outline', screen: 'HealthPersonalCareScreen' },
];

export default function CategoriesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Categories" onBack={() => navigation.goBack()} />
      <SearchBar placeholder="Search for anything" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate(cat.screen)}
            >
              <Ionicons name={cat.icon} size={50} color="#555" style={styles.icon} />
              <Text style={styles.title}>{cat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
