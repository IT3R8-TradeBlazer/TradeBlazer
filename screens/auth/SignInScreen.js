import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import buttonStyles from '../../components/SigninRegisButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen({ navigation }) {
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation error messages
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  // ---------------------------------------------------------
  // VALIDATION FUNCTION
  // Checks if the inputs are valid before signing in
  // ---------------------------------------------------------
  const validate = () => {
    let valid = true;
    let newErrors = { name: "", email: "", password: "" };

    if (name.trim() === "") {
      newErrors.name = "Name cannot be empty";
      valid = false;
    }
    if (!email.includes("@")) {
      newErrors.email = "Email must contain '@'";
      valid = false;
    }
    if (password.trim() === "") {
      newErrors.password = "Password cannot be empty";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ---------------------------------------------------------
  // SIGN IN FUNCTION
  // Verifies user input against saved user data
  // ---------------------------------------------------------
  const handleContinue = async () => {
    if (!validate()) return; // Stop if invalid

    try {
      // Get saved user data from AsyncStorage
      const storedUser = await AsyncStorage.getItem('userData');

      if (!storedUser) {
        Alert.alert("No account found", "Please register first.");
        return;
      }

      // Convert stored string back to object
      const { name: storedName, email: storedEmail, password: storedPassword } =
        JSON.parse(storedUser);

      // Check if email + password match
      if (email === storedEmail && password === storedPassword) {
        Alert.alert("Login successful!", `Welcome back, ${storedName}!`, [
          {
            text: "Continue",
            onPress: () =>
              // Reset navigation history so the user can't go back to SignIn
              navigation.reset({
                index: 0,
                routes: [{ name: "Main" }],
              }),
          },
        ]);
      } else {
        Alert.alert("Invalid credentials", "Your email or password is incorrect.");
      }
    } catch (error) {
      console.error("Error reading user data:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eBecf4' }}>
      {/* Moves UI upward when keyboard appears */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>

              {/* Logo */}
              <View style={styles.header}>
                <Image
                  source={require('../../assets/lo.png')}
                  style={styles.headerImg}
                />
              </View>

              <Text style={styles.title}>Sign In to TradeBlazer</Text>
              <Text style={styles.subtitle}>An online market within campus</Text>

              {/* ---------------------- FORM ---------------------- */}
              <View style={styles.form}>

                {/* Name Field */}
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <TextInput
                    placeholder="Full Name"
                    placeholderTextColor="#6b7288"
                    style={styles.inputControl}
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                      setErrors((prev) => ({
                        ...prev,
                        name: text.trim() === "" ? "Name cannot be empty" : "",
                      }));
                    }}
                  />
                </View>
                {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

                {/* Email Field */}
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="text@sample.com"
                    placeholderTextColor="#6b7288"
                    style={styles.inputControl}
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setErrors((prev) => ({
                        ...prev,
                        email: !text.includes("@") ? "Email must contain '@'" : "",
                      }));
                    }}
                  />
                </View>
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

                {/* Password Field */}
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    secureTextEntry
                    placeholder="*******"
                    placeholderTextColor="#6b7288"
                    style={styles.inputControl}
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      setErrors((prev) => ({
                        ...prev,
                        password:
                          text.trim() === ""
                            ? "Password cannot be empty"
                            : text.length < 6
                            ? "Password must be at least 6 characters"
                            : "",
                      }));
                    }}
                  />
                </View>
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

                {/* Sign In Button */}
                <View style={styles.formAction}>
                  <TouchableOpacity onPress={handleContinue}>
                    <View style={buttonStyles.btn}>
                      <Text style={buttonStyles.btnText}>Sign In</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Registration Link */}
                <Text style={styles.formFooter}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("RegistrationScreen")}>
                  <Text style={styles.reg}>Register</Text>
                </TouchableOpacity>

              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  reg: {
    textDecorationLine: 'underline',
    marginVertical: -5.8,
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  headerImg: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
  },
  inputControl: {
    height: 44,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 9,
  },
  formFooter: {
    marginVertical: 10,
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});
