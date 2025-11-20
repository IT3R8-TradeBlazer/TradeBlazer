import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getUser, saveUser } from '../../utils/storage';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { Ionicons } from '@expo/vector-icons';

export default function ChangeDisplayPhotoScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);

  // Load user from AsyncStorage
  const loadUser = async () => {
    const currentUser = await getUser();
    setUser(currentUser);
    setNewPhoto(currentUser?.photo || null); // initialize newPhoto
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadUser);
    return unsubscribe;
  }, [navigation]);

  // Pick a new photo from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Permission required to access gallery');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.Images],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setNewPhoto(result.assets[0].uri); // preview new photo
    }
  };

  // Save new photo to AsyncStorage
  const handleSave = async () => {
    if (!newPhoto || !user) return;

    const updatedUser = { ...user, photo: newPhoto };
    await saveUser(updatedUser); // save in AsyncStorage
    Alert.alert('Success', 'Profile photo updated!');
    navigation.goBack(); // ProfileScreen will reload on focus
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Header */}
      <Header navigation={navigation} />

      {/* Header Row with Back Button and Title */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#2E5E3E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Display Photo</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          key={newPhoto} // forces re-render
          source={{
            uri: newPhoto
              ? newPhoto
              : 'https://scontent.fcgm1-1.fna.fbcdn.net/v/t1.15752-9/566535979_1780782289237149_96679168949369319_n.jpg',
          }}
          style={styles.profilePic}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.subtext}>{user.department}</Text>
        <Text style={styles.subtext}>{user.role === 'student' ? 'Student' : 'Employee'}</Text>
      </View>

      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Choose New Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSave} style={[styles.button, { backgroundColor: '#1C4520' }]}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ECF2E8' ,
  },
  center: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E5E3E',
    marginLeft: 6,
  },
  profileSection: { 
    alignItems: 'center', 
    marginTop: 20,
   },
  profilePic: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    marginBottom: 10, 
    backgroundColor: '#ccc', 
  },
  name: { 
    fontSize: 20, 
    fontWeight: 'bold',
   },
  subtext: { 
    color: '#777',
   },
  button: {
    backgroundColor: '#2E5E3E',
    padding: 12,
    marginHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});
