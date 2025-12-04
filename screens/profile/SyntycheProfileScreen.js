import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';

export default function SyntycheProfileScreen() {
  const user = {
    name: 'Syntyche',
    department: 'Information Technology',
    photo: 'https://cdn-icons-png.flaticon.com/512/9942/9942203.png',
    address: 'Cagayan de Oro, Philippines',
    email: 'syntyche@example.com',
    phone: '09171234567',
  };

  return (
    <View style={styles.container}>
      <Header title="TradeBlazer" />
      <View style={styles.profileSection}>
        <Image source={{ uri: user.photo }} style={styles.profilePic} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.subtext}>{user.department}</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.contactBtn}>
          <Text style={styles.btnText}>CONTACT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportBtn}>
          <Text style={styles.btnText}>REPORT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>About</Text>
        <Text>{user.address}</Text>

        <Text style={styles.label}>Contact</Text>
        <Text>{user.email}</Text>
        <Text>{user.phone}</Text>
      </View>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  profileSection: { alignItems: 'center', marginTop: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: 'bold' },
  subtext: { color: '#777' },
  buttons: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 15 },
  contactBtn: { backgroundColor: '#2e7d32', padding: 10, borderRadius: 8 },
  reportBtn: { backgroundColor: '#d32f2f', padding: 10, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  infoSection: { margin: 20 },
  label: { marginTop: 10, fontWeight: 'bold' },
});
