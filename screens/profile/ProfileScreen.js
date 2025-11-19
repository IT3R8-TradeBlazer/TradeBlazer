import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { getUser } from '../../utils/storage';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
    };
    loadUser();
  }, []);

  if (!user) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: user.photo
              ? user.photo
              : 'https://scontent.fcgm1-1.fna.fbcdn.net/v/t1.15752-9/566535979_1780782289237149_96679168949369319_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHx5EP842wTlRutmCYcdi3VUr3B-pk69rNSvcH6mTr2s6Pscz9iz0RN8Nlug92Z2rr7AzWELSjq0ht4AG5wn0Ju&_nc_ohc=KhctuCp3zo4Q7kNvwHZ6rte&_nc_oc=AdnIkagcF2JeDHyTK3frVaz0UlUQUG5m_bMiFjXNjq0ek75z3O5g3uHQ-jM6LQA2Lzg&_nc_zt=23&_nc_ht=scontent.fcgm1-1.fna&oh=03_Q7cD3wEfANxkXH1t5PaRY6iyreZWjWZKwTSQVjqntcAGJvBCZw&oe=6932F369',
          }}
          style={styles.profilePic}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.subtext}>{user.department}</Text>
        <Text style={styles.subtext}>{user.role === 'student' ? 'Student' : 'Employee'}</Text>
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.label}>About</Text>
        <Text>{user.address || 'Cagayan de Oro, Philippines'}</Text>

        <Text style={styles.label}>Contact</Text>
        <Text>{user.email}</Text>
        <Text>{user.phone || 'N/A'}</Text>
      </View>

      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ECF2E8' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  profileSection: { alignItems: 'center', marginTop: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: 'bold' },
  subtext: { color: '#777' },
  infoSection: { margin: 20 },
  label: { marginTop: 10, fontWeight: 'bold' },
});
