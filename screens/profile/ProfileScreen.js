import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getUser } from "../../utils/storage";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { Ionicons } from "@expo/vector-icons";
import { PostsContext } from "../../context/PostsContext";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [menuVisible, setMenuVisible] = useState(null);

  const { posts, deletePost } = useContext(PostsContext);

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

  // Filter posts that belong to this user and sort newest first
  const myPosts = posts
    .filter((p) => p.userId === user?.id)
    .sort((a, b) => b.id - a.id);

  const confirmDelete = (postId) => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deletePost(postId),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="TradeBlazer" />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image
            key={user.photo}
            source={{ uri: user.photo || undefined }}
            style={styles.profilePic}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.subtext}>{user.department}</Text>
          <Text style={styles.subtext}>
            {user.role === "student" ? "Student" : "Employee"}
          </Text>
        </View>

        {/* About & Contact */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>About</Text>
          <Text>{user.address || "Cagayan de Oro, Philippines"}</Text>

          <Text style={styles.label}>Contact</Text>
          <Text>{user.email}</Text>
          <Text>{user.phone || "N/A"}</Text>
        </View>

        {/* User Posts */}
        <View style={styles.postsSection}>
          <Text style={styles.screenTitle}>My Posts</Text>
          {myPosts.length === 0 && (
            <Text style={{ marginTop: 10, textAlign: "center" }}>No posts yet</Text>
          )}

          {myPosts.map((post) => (
            <View key={post.id} style={styles.card}>
              <Image source={{ uri: post.image }} style={styles.image} />
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.productName}>{post.name}</Text>
                  <Text style={styles.productPrice}>{post.price}</Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    setMenuVisible(menuVisible === post.id ? null : post.id)
                  }
                >
                  <Ionicons name="ellipsis-vertical" size={22} color="#2E5E3E" />
                </TouchableOpacity>
              </View>

              {menuVisible === post.id && (
                <View style={styles.menu}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                      setMenuVisible(null);
                      navigation.navigate("EditPost", { post });
                    }}
                  >
                    <Text style={styles.menuText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => confirmDelete(post.id)}
                  >
                    <Text style={[styles.menuText, { color: "red" }]}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECF2E8" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  profileSection: { alignItems: "center", marginTop: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#ccc" },
  name: { fontSize: 20, fontWeight: "bold", color: "#2E5E3E" },
  subtext: { color: "#777" },

  infoSection: { marginVertical: 20 },
  label: { marginTop: 10, fontWeight: "bold", fontSize: 16, color: "#2E5E3E" },

  postsSection: { marginTop: 20 },
  screenTitle: { fontSize: 20, fontWeight: "700", color: "#2E5E3E" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
    overflow: "hidden",
    paddingBottom: 10,
    position: "relative",
  },
  image: { width: "100%", height: 180 },

  cardHeader: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  productName: { fontSize: 16, fontWeight: "600", color: "#2E5E3E" },
  productPrice: { fontSize: 14, color: "#444", marginTop: 4 },

  menu: {
    position: "absolute",
    right: 10,
    top: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    elevation: 4,
    zIndex: 999,
  },
  menuItem: { paddingVertical: 6 },
  menuText: { fontSize: 14, color: "#2E5E3E" },
});
