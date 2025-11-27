import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { getUser } from '../../utils/storage';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    const currentUser = await getUser(); // loads "userData"
    setUser(currentUser);
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadUser);
    return unsubscribe;
  }, [navigation]);

  if (!user) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.profileSection}>
        <Image
          key={user.photo}
          source={{ uri: user.photo || undefined }}
          style={styles.profilePic}
        />

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.subtext}>{user.department}</Text>
        <Text style={styles.subtext}>{user.role === 'student' ? 'Student' : 'Employee'}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>About</Text>
        <Text>{user.address || 'Cagayan de Oro, Philippines'}</Text>

        <Text style={styles.label}>Contact</Text>
        <Text>{user.email}</Text>
        <Text>{user.phone || 'N/A'}</Text>
      </View>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ECF2E8' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  profileSection: { alignItems: 'center', marginTop: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 10, backgroundColor: '#ccc' },
  name: { fontSize: 20, fontWeight: 'bold' },
  subtext: { color: '#777' },
  infoSection: { margin: 20 },
  label: { marginTop: 10, fontWeight: 'bold' },
});
