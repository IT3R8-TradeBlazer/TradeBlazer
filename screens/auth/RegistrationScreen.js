import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import buttonStyles from '../../components/SigninRegisButton'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../../components/CustomAlert';

export default function RegistrationScreen({ navigation }) {

  // Form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Stores validation error messages for each input
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  // Role = student or employee
  const [selectedRole, setSelectedRole] = useState(null);

  // Department picker selection
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // List of departments for the dropdown menu
  const departments = [
    { label: 'CITC', value: 'CITC' },
    { label: 'CEA', value: 'CEA' },
    { label: 'CSTE', value: 'CSTE' },
    { label: 'COT', value: 'COT' },
    { label: 'CSM', value: 'CSM' },
    { label: 'CON', value: 'CON' },
    { label: 'School of Medicine', value: 'School of Medicine' },
  ];

  // ---------------------------
  // VALIDATION FUNCTION
  // ---------------------------
  const validate = () => {
    let valid = true;
    let newErrors = { name: "", email: "", password: "" };

    // Name validation
    if (name.trim() === "") {
      newErrors.name = "Name cannot be empty";
      valid = false;
    }

    // Email validation
    if (!email.includes("@")) {
      newErrors.email = "Email must contain '@'";
      valid = false;
    }

    // Password validation
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

  // ---------------------------
  // HANDLE REGISTRATION
  // ---------------------------
  const handleContinue = async () => {

    // Check if all inputs are valid before proceeding
    if (!validate()) return;

    // Make sure user chose a role
    if (!selectedRole) {
      setIsSuccess(false);
      setAlertTitle("Missing Role");
      setAlertMessage("Please select your role (Student or Employee).");
      setAlertVisible(true);
      return;
    }

    // Make sure user selected a department
    if (!selectedDepartment) {
      setIsSuccess(false);
      setAlertTitle("Missing Department");
      setAlertMessage("Please select your department or college.");
      setAlertVisible(true);
      return;
    }

    try {
      // Bundle user info into an object
      const userData = {
        name,
        email,
        password,
        role: selectedRole,
        department: selectedDepartment,
      };

      // Save to local storage (acts like a temporary database)
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      // Confirmation message
      setIsSuccess(true);
      setAlertTitle("Account Created");
      setAlertMessage(`Welcome, ${name}!`);
      setAlertVisible(true);

    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#eBecf4' }}>
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        success={isSuccess}
        autoClose={isSuccess}  // auto-close for successful registration
        onClose={() => {
          setAlertVisible(false);
          if (isSuccess) {
            navigation.navigate("SignIn");
          }
        }}
      />

      <View style={styles.container}>

        {/* Logo */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/lo.png')}
            style={styles.headerImg}
          />
        </View>

        <Text style={styles.title}>Register to TradeBlazer</Text>
        <Text style={styles.subtitle}>An online market within campus</Text>

        <View style={styles.form}>

          {/* --------------------
              NAME INPUT
          -------------------- */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              placeholder='Full Name'
              placeholderTextColor='#6b7288'
              style={styles.inputControl}
              value={name}
              onChangeText={(text) => {
                setName(text);

                // Live validation
                if (text.trim() === "") {
                  setErrors((prev) => ({ ...prev, name: "Name cannot be empty" }));
                } else {
                  setErrors((prev) => ({ ...prev, name: "" }));
                }
              }}
            />
          </View>
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

          {/* --------------------
              EMAIL INPUT
          -------------------- */}
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

                // Live validation
                if (!text.includes("@")) {
                  setErrors((prev) => ({ ...prev, email: "Email must contain '@'" }));
                } else {
                  setErrors((prev) => ({ ...prev, email: "" }));
                }
              }}
            />
          </View>
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

          {/* --------------------
              PASSWORD INPUT
          -------------------- */}
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

                // Live validation
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

          {/* --------------------
              ROLE SELECTION BUTTONS
          -------------------- */}
          <View style={styles.roleContainer}>
            {/* Student button */}
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

            {/* Employee button */}
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

          {/* --------------------
              DEPARTMENT DROPDOWN
          -------------------- */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Department</Text>
            <View style={styles.dropdownContainer}>
              <RNPickerSelect
                onValueChange={(value) => setSelectedDepartment(value)}
                items={departments}
                placeholder={{ label: 'Select your department...', value: null }}
                style={{
                  inputIOS: styles.dropdownInput,
                  inputAndroid: styles.dropdownInput,
                }}
                value={selectedDepartment}
              />
            </View>
          </View>

          {/* --------------------
              SUBMIT BUTTON
          -------------------- */}
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleContinue}>
              <View style={buttonStyles.btn}>
                <Text style={buttonStyles.btnText}>Create Account</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Navigate to Sign In */}
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