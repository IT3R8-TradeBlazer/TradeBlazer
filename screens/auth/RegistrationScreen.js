import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import buttonStyles from '../../components/SigninRegisButton'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../../components/CustomAlert';

export default function RegistrationScreen({ navigation }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", password: "", idNumber: "" });

  const [selectedRole, setSelectedRole] = useState(null);
  const [idNumber, setIdNumber] = useState("");
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

  const [isAgreed, setIsAgreed] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);

  const agreementText =
    "This app is solely for advertising USTP CDO Trailblazers' products and services.\n\n" +
    "No in-app purchases are made inside the application.\n" +
    "All transactions must be done via chat and meet-ups inside the USTP CDO campus.\n\n" +
    "By continuing, you agree to follow these terms.";

  const validate = () => {
    let valid = true;
    let newErrors = { name: "", email: "", password: "" };

    if (name.trim() === "") {
      newErrors.name = "Name cannot be empty";
      valid = false;
    }
    if (idNumber.trim() === "") {
      newErrors.idNumber = "ID Number cannot be empty";
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
      setIsSuccess(false);
      setAlertTitle("Missing Role");
      setAlertMessage("Please select your role (Student or Employee).");
      setAlertVisible(true);
      return;
    }

    if (!selectedDepartment) {
      setIsSuccess(false);
      setAlertTitle("Missing Department");
      setAlertMessage("Please select your department or college.");
      setAlertVisible(true);
      return;
    }

    if (!isAgreed) {
      setIsSuccess(false);
      setAlertTitle("Agreement Required");
      setAlertMessage("Please read and agree to the terms before continuing.");
      setAlertVisible(true);
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        idNumber,
        role: selectedRole,
        department: selectedDepartment
      };

      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      await AsyncStorage.setItem('userData', JSON.stringify(newUser));

      setIsSuccess(true);
      setAlertTitle("Account Created");
      setAlertMessage(`Welcome, ${name}!`);
      setAlertVisible(true);

    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView style={{ flex: 1, backgroundColor: '#eBecf4' }}>
        
        <CustomAlert
          visible={alertVisible}
          title={alertTitle}
          message={alertMessage}
          success={isSuccess}
          autoClose={isSuccess}
          onClose={() => {
            setAlertVisible(false);
            if (isSuccess) navigation.navigate("SignIn");
          }}
        />

        <CustomAlert
          visible={showAgreementModal}
          title="User Agreement"
          message={agreementText}
          success={true}
          onClose={() => setShowAgreementModal(false)}
        />

        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('../../assets/lo.png')} style={styles.headerImg} />
          </View>

          <Text style={styles.title}>Register to TradeBlazer</Text>
          <Text style={styles.subtitle}>An online market within campus</Text>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                placeholder='Full Name'
                placeholderTextColor='#6b7288'
                style={styles.inputControl}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

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
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <View style={styles.input}>
              <Text style={styles.inputLabel}>ID Number</Text>
              <TextInput
                placeholder="e.g. 2021311632"
                placeholderTextColor="#6b7288"
                style={styles.inputControl}
                value={idNumber}
                onChangeText={(text) => setIdNumber(text)}
              />
            </View>
            {errors.idNumber ? <Text style={styles.errorText}>{errors.idNumber}</Text> : null}

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                secureTextEntry
                placeholder='*******'
                placeholderTextColor='#6b7288'
                style={styles.inputControl}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <View style={styles.roleContainer}>
              <TouchableOpacity onPress={() => setSelectedRole("student")}>
                <View style={[buttonStyles.btn, selectedRole === "student" ? buttonStyles.btnActive : buttonStyles.btnInactive]}>
                  <Text style={[buttonStyles.btnText, selectedRole === "student" ? buttonStyles.textActive : buttonStyles.textInactive]}>Student</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.orText}>or</Text>
              <TouchableOpacity onPress={() => setSelectedRole("employee")}>
                <View style={[buttonStyles.btn, selectedRole === "employee" ? buttonStyles.btnActive : buttonStyles.btnInactive]}>
                  <Text style={[buttonStyles.btnText, selectedRole === "employee" ? buttonStyles.textActive : buttonStyles.textInactive]}>Employee</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Department</Text>
              <View style={styles.dropdownContainer}>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedDepartment(value)}
                  items={departments}
                  placeholder={{ label: 'Select your department...', value: null }}
                  style={{ inputIOS: styles.dropdownInput, inputAndroid: styles.dropdownInput }}
                  value={selectedDepartment}
                />
              </View>
            </View>

            <View style={styles.agreementContainer}>
              <TouchableOpacity onPress={() => setIsAgreed(!isAgreed)} style={styles.checkboxWrapper}>
                <View style={[styles.checkbox, isAgreed && styles.checkboxChecked]} />
                <Text style={styles.agreementLabel}>
                  I've read and agreed to the 
                  <Text style={styles.linkText} onPress={() => setShowAgreementModal(true)}> User Agreement</Text>
                </Text>
              </TouchableOpacity>
            </View>
            {!isAgreed && <Text style={styles.errorText}>You must agree to the terms before continuing.</Text>}

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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  agreementContainer: {
    marginVertical: 10,
  },

  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 4,
    marginRight: 8,
  },

  checkboxChecked: {
    backgroundColor: '#222',
  },

  agreementLabel: {
    fontSize: 14,
    color: '#222',
  },

  linkText: {
    color: '#0066cc',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },

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

  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },

  orText: {
    fontSize: 16,
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

  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 9,
    paddingHorizontal: 16,
    height: 44,
    justifyContent: 'center',
  },

  dropdownInput: {
    fontSize: 16,
    color: '#000',
  },
});
