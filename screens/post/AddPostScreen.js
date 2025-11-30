import React, { useState, useContext } from "react";
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
import { getUser } from "../../utils/storage";
import { PostsContext } from "../../context/PostsContext"; // Import global post context
import CustomAlert from "../../components/CustomAlert";


export default function AddPostScreen({ navigation }) {
  // Local state for the new post fields
  const [photoUri, setPhotoUri] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");


  // Access the addPost function from PostsContext
  const { addPost } = useContext(PostsContext);

  // -----------------------------------------------------------
  // Open device image picker to choose a product photo
  // -----------------------------------------------------------
  const pickImage = async () => {
    // Request gallery permission
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== "granted") {
      Alert.alert("Permission required", "Please allow photo access.");
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Save chosen image URI
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  // -----------------------------------------------------------
  // Create a post object and save it using context
  // -----------------------------------------------------------
  const handlePost = async () => {
  // Validation
    if (!photoUri) {
      setAlertTitle("Missing Photo");
      setAlertMessage("Please upload an image of your product.");
      setAlertVisible(true);
      return;
    }

    if (!title.trim()) {
      setAlertTitle("Missing Title");
      setAlertMessage("Please enter a product title.");
      setAlertVisible(true);
      return;
    }

    if (!price.trim()) {
      setAlertTitle("Missing Price");
      setAlertMessage("Please enter a price.");
      setAlertVisible(true);
      return;
    }

    if (!description.trim()) {
      setAlertTitle("Missing Description");
      setAlertMessage("Please describe your product.");
      setAlertVisible(true);
      return;
    }

    if (!category.trim()) {
      setAlertTitle("Missing Category");
      setAlertMessage("Please enter a product category.");
      setAlertVisible(true);
      return;
    }

    // Get current logged-in user
    const user = await getUser();

    // Build the post object
    const newProduct = {
      id: Date.now(),
      userId: user?.id,
      name: title,
      price: `₱${price}`,
      image: photoUri,
      description,
      category,
    };

    // Save post
    await addPost(newProduct);

    // Show success alert
    setAlertTitle("Success");
    setAlertMessage("Your product has been posted!");
    setAlertVisible(true);
  };


  // -----------------------------------------------------------
  // UI LAYOUT
  // -----------------------------------------------------------
  return (
    <SafeAreaView style={styles.container}>

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => {
          setAlertVisible(false);
          navigation.navigate("Home"); // ← navigate ONLY when user taps OK
        }}
      />


      {/* Header component */}
      <Header navigation={navigation} title="Add Post" />

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 120 }]}>

        {/* Photo picker */}
        <Text style={styles.inputLabel}>Add photo</Text>
        <TouchableOpacity style={styles.photoBox} onPress={pickImage}>
          {photoUri ? (
            // Show preview if selected
            <Image source={{ uri: photoUri }} style={styles.previewImage} />
          ) : (
            // Show plus icon if no photo selected
            <Ionicons name="add" size={32} color="#2E5E3E" />
          )}
        </TouchableOpacity>

        {/* Title input */}
        <Text style={styles.inputLabel}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter product title"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        {/* Price input */}
        <Text style={styles.inputLabel}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 500"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        {/* Description input */}
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={[styles.input, styles.description]}
          placeholder="Describe your product in detail..."
          placeholderTextColor="#888"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Category input */}
        <Text style={styles.inputLabel}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Gifts, Clothes, Accessories"
          placeholderTextColor="#888"
          value={category}
          onChangeText={setCategory}
        />

        {/* Submit post */}
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom navigation bar */}
      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

// -----------------------------------------------------------
// STYLES
// -----------------------------------------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECF2E8" },
  content: { paddingHorizontal: 20, paddingVertical: 20 },

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

  description: { height: 80, textAlignVertical: "top" },

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
