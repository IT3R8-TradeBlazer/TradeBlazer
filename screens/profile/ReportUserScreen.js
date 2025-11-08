import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { saveReport } from '../../utils/storage';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';

export default function ReportUserScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { reportedUserId } = route.params || {};
  const [reason, setReason] = useState('');

  const handleSubmit = async () => {
    if (!reason.trim()) {
      Alert.alert('Please enter a reason for reporting.');
      return;
    }

    await saveReport(reportedUserId, reason);
    Alert.alert('Reported Successfully');
    setReason('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="TradeBlazer" />
      <Text style={styles.label}>Reason for reporting...</Text>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Write it here..."
        value={reason}
        onChangeText={setReason}
      />

      <TouchableOpacity style={styles.reportBtn} onPress={handleSubmit}>
        <Text style={styles.reportText}>Report</Text>
      </TouchableOpacity>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  input: {
    backgroundColor: '#eaeaea',
    height: 150,
    textAlignVertical: 'top',
    borderRadius: 10,
    padding: 10,
  },
  reportBtn: { marginTop: 20, alignItems: 'center' },
  reportText: { color: 'red', fontSize: 16, fontWeight: 'bold' },
});
