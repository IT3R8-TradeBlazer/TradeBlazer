// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'userData';

// Save user info
export const saveUser = async (userData) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    console.log('User saved:', userData);
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

// Retrieve user info
export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};
