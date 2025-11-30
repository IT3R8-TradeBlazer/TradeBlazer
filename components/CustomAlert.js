import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CustomAlert({ visible, title, message, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },

  alertBox: {
    width: 300,
    backgroundColor: "#ECF2E8",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    elevation: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E5E3E",
    marginBottom: 8,
  },

  message: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#2E5E3E",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
