import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from "react-native";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const loadUserPosts = async () => {
      try {
        const storedPosts = await AsyncStorage.getItem("@tradeblazer_posts");
        const posts = storedPosts ? JSON.parse(storedPosts) : [];
        setUserPosts(posts);
      } catch (error) {
        console.log("Error loading posts:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", loadUserPosts);
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} />

      {/* Main content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>PROFILE</Text>

        {/* Display user's posts */}
        {userPosts.length > 0 ? (
          userPosts.map((item) => (
            <View key={item.id} style={styles.postCard}>
              <Image source={{ uri: item.image }} style={styles.postImage} />
              <View style={styles.postDetails}>
                <Text style={styles.postName}>{item.name}</Text>
                <Text style={styles.postPrice}>{item.price}</Text>
                {item.description ? <Text style={styles.postDesc}>{item.description}</Text> : null}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noPostsText}>You have not posted anything yet.</Text>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
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
    padding: 20,
    paddingBottom: 120,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E5E3E",
    marginBottom: 20,
    textAlign: "center",
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },
  postImage: {
    width: "100%",
    height: 180,
  },
  postDetails: {
    padding: 10,
  },
  postName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E5E3E",
  },
  postPrice: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  postDesc: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  noPostsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#666",
  },
});
