import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { Ionicons } from "@expo/vector-icons";
import { getUser, saveUser, updateUserInList } from "../../utils/storage";
import CustomAlert from "../../components/CustomAlert";


export default function EditNameScreen({ navigation }) {
  const [name, setName] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);


  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      if (user) setName(user.name);
    };
    loadUser();
  }, []);

const handleSave = async () => {
  if (!name.trim()) {
    setIsSuccess(false);
    setAlertTitle("Error");
    setAlertMessage("Name cannot be empty.");
    setAlertVisible(true);
    return;
  }

  const user = await getUser();
  const updatedUser = { ...user, name };

  // Save to userData
  await saveUser(updatedUser);

  // Save inside users array
  await updateUserInList(updatedUser);

  setIsSuccess(true);
  setAlertTitle("Success");
  setAlertMessage("Name updated successfully!");
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
            navigation.goBack(); // Auto return after success
          }
        }}
      />


    {/* Main Header */}
    <Header navigation={navigation} />

    {/* Header Row */}
    <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#2E5E3E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Name</Text>
    </View>

    {/* Contentwrapper */}
    <View style={styles.content}>
        <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter new name"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
    </View>

    {/* Bottom Navigation */}
    <BottomNav navigation={navigation} />

    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECF2E8" },
  
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
    marginBottom: 20, 
  },

    saveButton: {
    backgroundColor: "#2E5E3E",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
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
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

});
