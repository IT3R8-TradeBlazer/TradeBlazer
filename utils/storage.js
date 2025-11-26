import AsyncStorage from "@react-native-async-storage/async-storage";

const POST_KEY = "@tradeblazer_posts";
const USER_KEY = "userData";

export const saveUser = async (userData) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
};

export const getUser = async () => {
  const json = await AsyncStorage.getItem(USER_KEY);
  return json ? JSON.parse(json) : null;
};

export const savePost = async (post) => {
  const json = await AsyncStorage.getItem(POST_KEY);
  const posts = json ? JSON.parse(json) : [];
  posts.push(post);
  await AsyncStorage.setItem(POST_KEY, JSON.stringify(posts));
};

export const getPosts = async () => {
  const json = await AsyncStorage.getItem(POST_KEY);
  return json ? JSON.parse(json) : [];
};
