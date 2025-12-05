import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { Ionicons } from "@expo/vector-icons";
import { getUser, saveUser } from "../../utils/storage";
import CustomAlert from "../../components/CustomAlert";


export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);


  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getUser();
      setUser(storedUser);
    };
    loadUser();
  }, []);

  const handleSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setIsSuccess(false);
      setAlertTitle("Error");
      setAlertMessage("Please fill in all fields.");
      setAlertVisible(true);
      return;
    }

    if (currentPassword !== user.password) {
      setIsSuccess(false);
      setAlertTitle("Error");
      setAlertMessage("Current password is incorrect.");
      setAlertVisible(true);
      return;
    }

    if (newPassword.length < 6) {
      setIsSuccess(false);
      setAlertTitle("Error");
      setAlertMessage("New password must be at least 6 characters.");
      setAlertVisible(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setIsSuccess(false);
      setAlertTitle("Error");
      setAlertMessage("New password and confirm password do not match.");
      setAlertVisible(true);
      return;
    }

    const updatedUser = { ...user, password: newPassword };
    await saveUser(updatedUser);

    // GREEN SUCCESS ALERT
    setIsSuccess(true);
    setAlertTitle("Success");
    setAlertMessage("Password updated successfully!");
    setAlertVisible(true);
  };


  if (!user) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Loading user data...</Text>
      </SafeAreaView>
    );
  }

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
            navigation.goBack(); // auto return after success
          }
        }}
      />

      {/* Main Header */}
      <Header navigation={navigation} />

      {/* Header Row with Back Button */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#2E5E3E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          placeholderTextColor="#6b7288"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#6b7288"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          placeholderTextColor="#6b7288"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF2E8",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E5E3E",
    marginLeft: 6,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#2C4B23",
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    backgroundColor: "#fff",
    marginBottom: 15,
  },

  saveButton: {
    backgroundColor: "#2E5E3E",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "50%",
    marginTop: 10,
    elevation: 3,
  },

  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
