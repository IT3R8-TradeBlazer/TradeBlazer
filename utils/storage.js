import AsyncStorage from '@react-native-async-storage/async-storage';

/* ---------------- USER STORAGE ---------------- */

const USER_KEY = 'userData';

export const saveUser = async (userData) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    console.log("User saved:", userData);
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userData');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

export const updateUserInList = async (updatedUser) => {
  try {
    const stored = await AsyncStorage.getItem('users');
    let users = stored ? JSON.parse(stored) : [];

    users = users.map(u => 
      u.id === updatedUser.id ? updatedUser : u
    );

    await AsyncStorage.setItem('users', JSON.stringify(users));

  } catch (error) {
    console.error("Error updating user in users list:", error);
  }
};

/* ---------------- POSTS STORAGE (PER USER) ---------------- */

const getPostKey = (userId) => `@tradeblazer_posts_${userId}`;

// Add a post for a specific user
export const addPost = async (userId, post) => {
  try {
    const existingPosts = await getPosts(userId);
    const updated = [post, ...existingPosts];
    await AsyncStorage.setItem(getPostKey(userId), JSON.stringify(updated));
  } catch (error) {
    console.log("Error saving post:", error);
  }
};

// Get posts of specific user
export const getPosts = async (userId) => {
  try {
    const json = await AsyncStorage.getItem(getPostKey(userId));
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.log("Error loading posts:", error);
    return [];
  }
};

// Save multiple posts for specific user
export const savePosts = async (userId, posts) => {
  try {
    await AsyncStorage.setItem(getPostKey(userId), JSON.stringify(posts));
  } catch (error) {
    console.log("Error saving posts:", error);
  }
};

// Clear posts for specific user
export const clearPosts = async (userId) => {
  try {
    await AsyncStorage.removeItem(getPostKey(userId));
  } catch (error) {
    console.log("Error clearing posts:", error);
  }
};
