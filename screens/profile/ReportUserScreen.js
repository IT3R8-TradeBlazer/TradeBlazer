import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { Ionicons } from '@expo/vector-icons';
import CustomAlert from '../../components/CustomAlert';

export default function ReportUserScreen() {
  const navigation = useNavigation();
  const [reason, setReason] = useState('');

  // Alert states
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    if (!reason.trim()) {
      setIsSuccess(false);
      setAlertTitle('Empty Reason');
      setAlertMessage('Please enter a reason for reporting.');
      setAlertVisible(true);
      return;
    }

    // Show success alert
    setIsSuccess(true);
    setAlertTitle('Report Submitted');
    setAlertMessage('The user has been reported successfully.');
    setAlertVisible(true);

    setReason('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        success={isSuccess} 
        autoClose={isSuccess} // auto-close after successful report
        onClose={() => {
          setAlertVisible(false);
          if (isSuccess) navigation.goBack();
        }}
      />

      <Header navigation={navigation} />

      {/* Back + Title Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#2E5E3E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report User</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.label}>Reason for reporting</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Write it here..."
            value={reason}
            onChangeText={setReason}
          />

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF2E8',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#2E5E3E',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  section: {
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E5E3E',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    height: 150,
    textAlignVertical: 'top',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#2E5E3E',
    elevation: 2,
  },
  submitBtn: {
    backgroundColor: '#2E5E3E',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
    elevation: 3,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});