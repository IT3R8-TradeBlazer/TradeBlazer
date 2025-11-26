import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddPostScreen({ navigation }) {
  const [photoUri, setPhotoUri] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // Pick an image from gallery
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== "granted") {
      Alert.alert("Permission required", "Please allow photo access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  // Save new post to AsyncStorage
  const savePost = async (newProduct) => {
    try {
      const storedPosts = await AsyncStorage.getItem("@tradeblazer_posts");
      const posts = storedPosts ? JSON.parse(storedPosts) : [];
      posts.push(newProduct);
      await AsyncStorage.setItem("@tradeblazer_posts", JSON.stringify(posts));
    } catch (error) {
      console.log("Error saving post:", error);
    }
  };

  const handlePost = async () => {
    if (!title.trim()) {
      Alert.alert("Missing info", "Please enter a title for your product.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: title,
      price: price ? `₱${price}` : "₱0",
      image:
        photoUri ||
        "https://via.placeholder.com/200x200.png?text=New+Product",
      description,
      category,
    };

    // Save to AsyncStorage
    await savePost(newProduct);

    // Navigate back to HomeScreen
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="Add Post" />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Add Photo */}
        <Text style={styles.inputLabel}>Add photo</Text>
        <TouchableOpacity style={styles.photoBox} onPress={pickImage}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.previewImage} />
          ) : (
            <Ionicons name="add" size={32} color="#2E5E3E" />
          )}
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.inputLabel}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter product title"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        {/* Price */}
        <Text style={styles.inputLabel}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 500"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        {/* Description */}
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={[styles.input, styles.description]}
          placeholder="Describe your product in detail..."
          placeholderTextColor="#888"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Category */}
        <Text style={styles.inputLabel}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Gifts, Clothes, Accessories"
          placeholderTextColor="#888"
          value={category}
          onChangeText={setCategory}
        />

        {/* Post Button */}
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF2E8",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputLabel: {
    marginTop: 10,
    marginBottom: 6,
    fontWeight: "500",
    color: "#000",
    fontSize: 14,
  },
  photoBox: {
    width: "100%",
    height: 160,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  input: {
    backgroundColor: "#D9D9D9",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 14,
    color: "#000",
  },
  description: {
    height: 80,
    textAlignVertical: "top",
  },
  postButton: {
    alignSelf: "center",
    marginTop: 50,
  },
  postText: {
    color: "#2E5E3E",
    fontWeight: "600",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
