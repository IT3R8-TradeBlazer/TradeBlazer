import AsyncStorage from "@react-native-async-storage/async-storage";

const POSTS_KEY = "@tradeblazer_posts";

/**
 * Add a new post
 */
export const addPost = async (post) => {
  try {
    const existingPosts = await getPosts();
    const updatedPosts = [post, ...existingPosts];
    await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts));
  } catch (error) {
    console.log("Error saving post:", error);
  }
};

/**
 * Get all posts
 */
export const getPosts = async () => {
  try {
    const storedPosts = await AsyncStorage.getItem(POSTS_KEY);
    return storedPosts ? JSON.parse(storedPosts) : [];
  } catch (error) {
    console.log("Error loading posts:", error);
    return [];
  }
};

/**
 * Optional: clear all posts (for testing)
 */
export const clearPosts = async () => {
  try {
    await AsyncStorage.removeItem(POSTS_KEY);
  } catch (error) {
    console.log("Error clearing posts:", error);
  }
};
