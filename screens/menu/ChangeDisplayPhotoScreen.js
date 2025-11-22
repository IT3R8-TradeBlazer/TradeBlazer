import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getUser, saveUser } from '../../utils/storage';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { Ionicons } from '@expo/vector-icons';

export default function ChangeDisplayPhotoScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);

  const loadUser = async () => {
    const currentUser = await getUser();
    setUser(currentUser);
    setNewPhoto(currentUser?.photo || null);
  };

  useEffect(() => { loadUser(); }, []);
  useEffect(() => {
    const unsub = navigation.addListener('focus', loadUser);
    return unsub;
  }, [navigation]);

  // Pick an image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Allow gallery access to change your photo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });


    if (!result.canceled) {
      setNewPhoto(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    const updatedUser = { ...user, photo: newPhoto };
    await saveUser(updatedUser);

    Alert.alert("Success", "Profile photo updated!");
    navigation.goBack();
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <Header navigation={navigation} />

      {/* Back + Title Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#2E5E3E" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Change Display Photo</Text>
      </View>

      {/* Profile Photo Circle */}
      <View style={styles.photoWrapper}>
        <Image
          key={newPhoto}
          source={{ uri: newPhoto || undefined }}
          style={styles.photo}
        />
      </View>

      {/* Change Photo Button */}
      <TouchableOpacity onPress={pickImage} style={styles.changeBtn}>
        <Text style={styles.changeBtnText}>Change Photo</Text>
      </TouchableOpacity>

      {/* Save Button */}
      <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ECF2E8' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#2E5E3E',
  },

  photoWrapper: {
    marginTop: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  photo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#1C4520', // Dark green circle when empty
  },

  changeBtn: {
    borderWidth: 2,
    borderColor: "#2E5E3E",
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 18,
  },
  changeBtnText: {
    color: "#2E5E3E",
    fontSize: 16,
  },

  saveBtn: {
  backgroundColor: "#2E5E3E",
  paddingVertical: 14,
  borderRadius: 10,
  alignItems: "center",
  marginTop: 15,
  width: "90%",
  alignSelf: "center",
  elevation: 3,
},

  saveText: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "600",
  letterSpacing: 0.5,
  },
});
