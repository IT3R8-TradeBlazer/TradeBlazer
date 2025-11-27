import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { getUser, getPosts } from "../../utils/storage";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [myPosts, setMyPosts] = useState([]);

  const loadData = async () => {
    const currentUser = await getUser();
    setUser(currentUser);

    const posts = await getPosts();
    const filtered = posts.filter(p => p.userId === currentUser?.id);
    setMyPosts(filtered.slice().reverse()); // latest first
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadData);
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
          <Text style={styles.subtext}>{user.role === "student" ? "Student" : "Employee"}</Text>
        </View>

        {/* About & Contact */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>About</Text>
          <Text>{user.address || "Cagayan de Oro, Philippines"}</Text>

          <Text style={styles.label}>Contact</Text>
          <Text>{user.email}</Text>
          <Text>{user.phone || "N/A"}</Text>
        </View>

        {/* Posts */}
        <View style={styles.postsSection}>
          <Text style={styles.screenTitle}>My Posts</Text>
          {myPosts.length === 0 && <Text style={{ marginTop: 10, textAlign: "center" }}>No posts yet</Text>}

          {myPosts.map((post) => (
            <View key={post.id} style={styles.card}>
              <Image source={{ uri: post.image }} style={styles.image} />
              <View style={styles.cardDetails}>
                <Text style={styles.productName}>{post.name}</Text>
                <Text style={styles.productPrice}>{post.price}</Text>
              </View>
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
  profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 10, backgroundColor: "#ccc" },
  name: { fontSize: 20, fontWeight: "bold", color: "#2E5E3E" },
  subtext: { color: "#777" },
  infoSection: { marginVertical: 20 },
  label: { marginTop: 10, fontWeight: "bold", fontSize: 16, color: "#2E5E3E" },
  postsSection: { marginTop: 20 },
  screenTitle: { fontSize: 20, fontWeight: "700", color: "#2E5E3E", marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
    overflow: "hidden",
  },
  image: { width: "100%", height: 180 },
  cardDetails: { padding: 15 },
  productName: { fontSize: 16, fontWeight: "600", color: "#2E5E3E" },
  productPrice: { fontSize: 14, color: "#444", marginTop: 4 },
});
