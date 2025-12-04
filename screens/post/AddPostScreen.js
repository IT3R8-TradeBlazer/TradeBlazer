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
import { PostsContext } from "../../context/PostsContext";
import CustomAlert from "../../components/CustomAlert";
import { Picker } from "@react-native-picker/picker";


export default function AddPostScreen({ navigation }) {
  const [photoUri, setPhotoUri] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // 🔹 Added to manage redirect vs. staying on page
  const [isSuccess, setIsSuccess] = useState(false);

  const { addPost } = useContext(PostsContext);

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

  const handlePost = async () => {
    if (!photoUri) {
      setIsSuccess(false);
      setAlertTitle("Missing Photo");
      setAlertMessage("Please upload an image of your product.");
      setAlertVisible(true);
      return;
    }

    if (!title.trim()) {
      setIsSuccess(false);
      setAlertTitle("Missing Title");
      setAlertMessage("Please enter a product title.");
      setAlertVisible(true);
      return;
    }

    if (!price.trim()) {
      setIsSuccess(false);
      setAlertTitle("Missing Price");
      setAlertMessage("Please enter a price.");
      setAlertVisible(true);
      return;
    }

    if (!description.trim()) {
      setIsSuccess(false);
      setAlertTitle("Missing Description");
      setAlertMessage("Please describe your product.");
      setAlertVisible(true);
      return;
    }

    if (!category.trim()) {
      setIsSuccess(false);
      setAlertTitle("Missing Category");
      setAlertMessage("Please enter a product category.");
      setAlertVisible(true);
      return;
    }

    const user = await getUser();

    const newProduct = {
      id: Date.now(),
      userId: user?.id,
      name: title,
      price: `₱${price}`,
      image: photoUri,
      description,
      category,
    };

    await addPost(newProduct);

    // 🔹 Updated success handling (navigation done only after user presses OK)
    setIsSuccess(true);
    setAlertTitle("Success");
    setAlertMessage("Your product has been posted!");
    setAlertVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        success={isSuccess}
        onClose={() => {
          setAlertVisible(false);
          if (isSuccess) {
            navigation.navigate("Home");
          }
        }}
      />

      <Header navigation={navigation} title="Add Post" />

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 120 }]}>
        <Text style={styles.inputLabel}>Add photo</Text>
        <TouchableOpacity style={styles.photoBox} onPress={pickImage}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.previewImage} />
          ) : (
            <Ionicons name="add" size={32} color="#2E5E3E" />
          )}
        </TouchableOpacity>

        <Text style={styles.inputLabel}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter product title"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.inputLabel}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 500"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={[styles.input, styles.description]}
          placeholder="Describe your product in detail..."
          placeholderTextColor="#888"
          multiline
          value={description}
          onChangeText={setDescription}
        />  

        <Text style={styles.inputLabel}>Category</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
            style={{
              fontSize: 14,
              height: 50,
              color: category ? "#2E5E3E" : "#7A7A7A", // dark green if selected, gray if placeholder
            }}
            dropdownIconColor="#2E5E3E"
            mode="dropdown"
          >
            <Picker.Item label="Select category" value="" color="#7A7A7A" /> 
            <Picker.Item label="School Supplies" value="School Supplies" />
            <Picker.Item label="Women's Apparel" value="Women's Apparel" />
            <Picker.Item label="Men's Apparel" value="Men's Apparel" />
            <Picker.Item label="Health & Personal Care" value="Health & Personal Care" />
            <Picker.Item label="Gifts" value="Gifts" />
            <Picker.Item label="Accessories" value="Accessories" />
            <Picker.Item label="Food & Snacks" value="Food & Snacks" />
            <Picker.Item label="Books & Stationery" value="Books & Stationery" />
            <Picker.Item label="Home and Decor" value="Home and Decor" />
          </Picker>
        </View>


        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

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
  backgroundColor: "#2E5E3E",
  paddingVertical: 14,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 35,
  width: "60%",
  alignSelf: "center",
  elevation: 3,
  },

  postText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },


  dropdown: {
  backgroundColor: "#D9D9D9", // same as other inputs
  borderRadius: 4,             // match other input corners
  height: 50,
  justifyContent: "center",
  marginBottom: 12,
  paddingHorizontal: 10,       // match input padding
  },

  picker: {
    fontSize: 14,
    height: 50,
  },
});
