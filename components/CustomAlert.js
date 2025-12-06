import React, { useEffect } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CustomAlert({
  visible,
  title,
  message,
  onClose,
  success,
  autoClose,
  logoutConfirm,
  deleteConfirm, // New prop for delete confirmation
}) {

  useEffect(() => {
    if (visible && autoClose) {
      const timeout = setTimeout(() => {
        onClose();
      }, 2000); // auto-close after 2s
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View
          style={[
            styles.alertBox,
            {
              backgroundColor: success ? "#DFF5E1" : "#FBE7E7", // Green for success, Red for failure
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              { color: success ? "#0F7B45" : "#B3261E" },
            ]}
          >
            {title}
          </Text>
          <Text style={[styles.message, { color: "#2C4B23" }]}>{message}</Text>

          {/* Normal OK button */}
          {!autoClose && !logoutConfirm && !deleteConfirm && (
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: success ? "#2E5E3E" : "#B3261E" },
              ]}
              onPress={() => onClose("ok")}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          )}

          {/* Logout confirm buttons */}
          {logoutConfirm && (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#A6C2A0", marginHorizontal: 5 }]}
                onPress={() => onClose("cancel")}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#B3261E", marginHorizontal: 5 }]}
                onPress={() => onClose("logout")}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Delete confirm buttons */}
          {deleteConfirm && (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#A6C2A0", marginHorizontal: 5 }]}
                onPress={() => onClose("cancel")}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#B3261E", marginHorizontal: 5 }]}
                onPress={() => onClose("delete")}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}

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
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
