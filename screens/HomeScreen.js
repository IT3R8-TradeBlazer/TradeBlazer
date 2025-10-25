import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import React, { useState } from 'react';

export default function HomeScreen( {navigation} ) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: ""});
  const [selectedRole, setSelectedRole] = useState(null);

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

  const handleContinue = () => {
    if (!validate()) return; // ✅ check first
    Alert.alert(
      "Logged in successfully!",
      `\nWelcome ${name}!`,
      [
        { text: "Continue", onPress: () => navigation.navigate("Dash") }
      ]
    );
  };

  return (
    
    <SafeAreaView style={{flex: 1, backgroundColor: '#eBecf4'}}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/lo.png')}
          style={styles.headerImg}
        />
      </View>
      
      <Text style={styles.title}>Sign In to TradeBlazer</Text>
      <Text style={styles.subtitle}>An online market within campus</Text>

      <View style={styles.form}>
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput 
            placeholder='Jayce Lago Tabobo'
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
        {errors.name ? <Text style={{ color: "red", marginBottom: 8, textAlign:'center'}}>{errors.name}</Text> : null}

        <View style={styles.input}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput 
            secureTextEntry
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            placeholder='jayce@sample.com'
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
        {errors.email ? <Text style={{ color: "red", marginBottom: 8, textAlign:'center' }}>{errors.email}</Text> : null}

        <View style={styles.input}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput 
            secureTextEntry
            placeholder='*******'
            placeholderTextColor='#6b7288'
            style={styles.inputControl}
            value={password}
            onChangeText={(text) => {
              setPassword(text);  // ✅ update password state
              if (text.trim() === "") {
                setErrors((prev) => ({ ...prev, password: "Password cannot be empty" })); // ✅ password error
              } else if (text.length < 6) {
                setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters" })); // ✅ min length check
              } else {
                setErrors((prev) => ({ ...prev, password: "" })); // ✅ clear password error
              }
            }}
          />
        </View>
        {errors.password ? <Text style={{ color: "red", textAlign: 'center' }}>{errors.password}</Text> : null}
        
        <View style={styles.formAction}>
          <TouchableOpacity onPress={handleContinue}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Sign In</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.formFooter}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => {
            
            console.log('Register link pressed');
          }}>
            <Text onPress={() => navigation.navigate("RegistrationScreen")} style={styles.reg}>Register</Text>
          </TouchableOpacity>
        
      </View>
    </View>
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
    marginTop:20,
    marginBottom:20,
    marginVertical: 0,
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
  input:{marginBottom: 12},
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
    borderRadius:9,
  },
  btn: {
    marginVertical: 15,
    backgroundColor: '#357045',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10, 
    paddingVertical: 10,
  },
  btnText: {
    letterSpacing: 1.5,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  formFooter: {
    marginVertical: 10,
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.5,
  }
});
