import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { addPost } from "../../utils/storage";

export default function AddPostScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handlePost = async () => {
    if (!title || !price || !image) {
      alert("Please fill in title, price, and image.");
      return;
    }

    const newPost = {
      id: Date.now(),
      name: title,
      description,
      price: `₱${price}`,
      image,
    };

    await addPost(newPost);
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Add Photos
      </Text>

      <TouchableOpacity
        onPress={pickImage}
        style={{
          backgroundColor: "#eee",
          height: 200,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        {image ? (
          <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} />
        ) : (
          <Text>Tap to upload photo</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
        }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
        }}
        multiline
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
        }}
      />
      <Button title="Post" onPress={handlePost} />
    </View>
  );
}
