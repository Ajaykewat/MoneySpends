import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { Picker } from '@react-native-picker/picker'; // npm install @react-native-picker/picker

const ProfileScreen = () => {
  const [entries, setEntries] = useState([{ method: '', amount: '' }]);

  const formatIndianAmount = value => {
    const num = value.replace(/[^0-9]/g, '');
    if (!num) return '';
    return Number(num).toLocaleString('en-IN');
  };

  const handleMethodChange = (index, value) => {
    const updated = [...entries];
    updated[index].method = value;
    setEntries(updated);
  };

  const handleAmountChange = (index, value) => {
    const updated = [...entries];
    updated[index].amount = formatIndianAmount(value);
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([...entries, { method: '', amount: '' }]);
  };

  const submitData = () => {
    const rawData = entries.map(e => ({
      method: e.method,
      amount: e.amount.replace(/,/g, ''),
    }));
    Alert.alert('Submitted', JSON.stringify(rawData, null, 2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Payment Entries</Text>

      {entries.map((entry, index) => (
        <View key={index} style={styles.entryContainer}>
          <Text style={styles.label}>Payment Method:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={entry.method}
              onValueChange={val => handleMethodChange(index, val)}
            >
              <Picker.Item label="-- Select --" value="" />
              <Picker.Item label="Credit Card" value="creditcard" />
              <Picker.Item label="Bank" value="bank" />
            </Picker>
          </View>

          <Text style={styles.label}>Amount:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={entry.amount}
            onChangeText={val => handleAmountChange(index, val)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addEntry}>
        <Text style={styles.addButtonText}>+ Add More</Text>
      </TouchableOpacity>

      <View style={styles.submitButton}>
        <Button title="Submit" onPress={submitData} />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },
  entryContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    overflow: 'hidden',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#eee',
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 20,
  },
  addButtonText: {
    fontWeight: '600',
    color: '#333',
  },
  submitButton: {
    marginTop: 10,
  },
});
