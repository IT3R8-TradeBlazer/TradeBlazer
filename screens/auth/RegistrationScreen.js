import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import buttonStyles from '../../components/SigninRegisButton'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegistrationScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const departments = [
    { label: 'CITC', value: 'CITC' },
    { label: 'CEA', value: 'CEA' },
    { label: 'CSTE', value: 'CSTE' },
    { label: 'COT', value: 'COT' },
    { label: 'CSM', value: 'CSM' },
    { label: 'CON', value: 'CON' },
    { label: 'School of Medicine', value: 'School of Medicine' },
  ];

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

  const handleContinue = async () => {
    if (!validate()) return;

    if (!selectedRole) {
      Alert.alert("Missing Role", "Please select your role (Student or Employee).");
      return;
    }

    if (!selectedDepartment) {
      Alert.alert("Missing Department", "Please select your department or college.");
      return;
    }

    try {
      const userData = {
        name,
        email,
        password,
        role: selectedRole,
        department: selectedDepartment,
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      Alert.alert(
        "Account Created",
        `Welcome, ${name}!`,
        [{ text: "Continue", onPress: () => navigation.navigate("SignIn") }]
      );
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#eBecf4' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/lo.png')}
            style={styles.headerImg}
          />
        </View>

        <Text style={styles.title}>Register to TradeBlazer</Text>
        <Text style={styles.subtitle}>An online market within campus</Text>

        <View style={styles.form}>
          {/* Name */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              placeholder='Full Name'
              placeholderTextColor='#6b7288'
              style={styles.inputControl}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (text.trim() === "") {
                  setErrors((prev) => ({ ...prev, name: "Name cannot be empty" }));
                } else {
                  setErrors((prev) => ({ ...prev, name: "" }));
                }
              }}
            />
          </View>
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

          {/* Email */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              placeholder='text@sample.com'
              placeholderTextColor='#6b7288'
              style={styles.inputControl}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (!text.includes("@")) {
                  setErrors((prev) => ({ ...prev, email: "Email must contain '@'" }));
                } else {
                  setErrors((prev) => ({ ...prev, email: "" }));
                }
              }}
            />
          </View>
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

          {/* Password */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry
              placeholder='*******'
              placeholderTextColor='#6b7288'
              style={styles.inputControl}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (text.trim() === "") {
                  setErrors((prev) => ({ ...prev, password: "Password cannot be empty" }));
                } else if (text.length < 6) {
                  setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters" }));
                } else {
                  setErrors((prev) => ({ ...prev, password: "" }));
                }
              }}
            />
          </View>
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

          {/* Role Selection */}
          <View style={styles.roleContainer}>
            <TouchableOpacity onPress={() => setSelectedRole("student")}>
              <View style={[
                buttonStyles.btn,
                selectedRole === "student" ? buttonStyles.btnActive : buttonStyles.btnInactive
              ]}>
                <Text style={[
                  buttonStyles.btnText,
                  selectedRole === "student" ? buttonStyles.textActive : buttonStyles.textInactive
                ]}>
                  Student
                </Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.orText}>or</Text>

            <TouchableOpacity onPress={() => setSelectedRole("employee")}>
              <View style={[
                buttonStyles.btn,
                selectedRole === "employee" ? buttonStyles.btnActive : buttonStyles.btnInactive
              ]}>
                <Text style={[
                  buttonStyles.btnText,
                  selectedRole === "employee" ? buttonStyles.textActive : buttonStyles.textInactive
                ]}>
                  Employee
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Department Dropdown */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Department</Text>
            <View style={styles.dropdownContainer}>
              <RNPickerSelect
                onValueChange={(value) => setSelectedDepartment(value)}
                items={departments}
                placeholder={{
                  label: 'Select your department...',
                  value: null,
                }}
                style={{
                  inputIOS: styles.dropdownInput,
                  inputAndroid: styles.dropdownInput,
                }}
                value={selectedDepartment}
              />
            </View>
          </View>

          {/* Submit */}
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleContinue}>
              <View style={buttonStyles.btn}>
                <Text style={buttonStyles.btnText}>Create Account</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.formFooter}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.reg}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  container: { padding: 24, flex: 1 },
  header: { marginTop: 20, marginBottom: 20 },
  headerImg: { width: 150, height: 150, alignSelf: 'center' },
  title: { textAlign: 'center', fontWeight: '700', fontSize: 20, marginBottom: 6 },
  subtitle: { fontSize: 14, fontWeight: '500', color: '#929292', textAlign: 'center', marginBottom: 30 },
  input: { marginBottom: 12 },
  inputLabel: { fontSize: 16, fontWeight: '600', color: '#222', marginBottom: 6 },
  inputControl: { height: 44, paddingHorizontal: 16, backgroundColor: '#fff', borderRadius: 9 },
  roleContainer: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 10 },
  orText: { fontSize: 16 },
  formFooter: { marginVertical: 10, fontSize: 17, fontWeight: '600', color: '#222', textAlign: 'center', letterSpacing: 0.5 },
  errorText: { color: "red", marginBottom: 8, textAlign: 'center' },
  dropdownContainer: { backgroundColor: '#fff', borderRadius: 9, paddingHorizontal: 16, height: 44, justifyContent: 'center' },
  dropdownInput: { fontSize: 16, color: '#000' },
});