import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Text,
} from 'react-native';
import InputField from '../components/InputField';
import CustomDropdown from '../components/CustomDropdown';
import CustomButton from '../components/CustomButton';
import { resetCache } from '../../metro.config';
import { addAmount } from '../utils/Storage';
import { useNavigation } from '@react-navigation/native';

const AddScreen = () => {
  const [amount, setAmount] = useState('');
  const [reasone, setReasone] = useState('');
  const [error, setError] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);
  const [selectedPaymentModeSub, setSelectedPaymentModeSub] = useState(null);

  const navigate = useNavigation();

  const handlePress = async () => {
    try {
      setLoading(true);
      if (amount.trim() === '') {
        return setError({ type: 'amount', message: 'Amount is required' });
      }

      if (!selectedPaymentMode) {
        return setError({
          type: 'selectedPaymentMode',
          message: 'Payment mode is required',
        });
      }

      if (selectedPaymentMode !== 'CASH' && !selectedPaymentModeSub) {
        return setError({
          type: 'selectedPaymentModeSub',
          message: 'Payment method is required',
        });
      }
      if (!selectedPaymentType) {
        return setError({
          type: 'selectedPaymentType',
          message: 'Amount type is required',
        });
      }
      if (reasone.trim() === '') {
        return setError({ type: 'reasone', message: 'Reason is required' });
      }

      // All valid
      setError({ type: '', message: '' });

      await addAmount({
        amount,
        selectedPaymentMode,
        selectedPaymentModeSub,
        selectedPaymentType,
        reasone,
      });
      Alert.alert('Success', 'Form submitted successfully');
      navigate.navigate('dashboard');
      setAmount('');
      setSelectedPaymentMode('');
      setSelectedPaymentModeSub('');
      setSelectedPaymentType('');
      setLoading(false);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  console.log('error', error);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, padding: 20 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <InputField
              label="Add Amount *"
              placeholder="Enter your amount"
              icon="money"
              type="FontAwesome"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            {error.type === 'amount' && (
              <Text style={{ color: 'red', fontSize: 16 }}>
                {error.message}
              </Text>
            )}

            <CustomDropdown
              label="Payment Mode *"
              options={['CASH', 'UPI', 'CARD']}
              selected={selectedPaymentMode}
              onSelect={e => {
                setSelectedPaymentMode(e), setSelectedPaymentModeSub('');
              }}
              placeholder="Select Payment Mode"
            />
            {error.type === 'selectedPaymentMode' && (
              <Text style={{ color: 'red', fontSize: 16 }}>
                {error.message}
              </Text>
            )}

            {selectedPaymentMode === 'UPI' && (
              <CustomDropdown
                label="Payment Mode *"
                options={['Google pay', 'Phone Pay', 'Cred']}
                selected={selectedPaymentModeSub}
                onSelect={setSelectedPaymentModeSub}
                placeholder="Select Payment Mode"
              />
            )}
            {error.type === 'selectedPaymentModeSub' && (
              <Text style={{ color: 'red', fontSize: 16 }}>
                {error.message}
              </Text>
            )}

            {selectedPaymentMode === 'CARD' && (
              <CustomDropdown
                label="Payment Mode *"
                options={[
                  'Kotak Cradit Card',
                  'Kotak ATM Card',
                  'SBI ATM Card',
                ]}
                selected={selectedPaymentModeSub}
                onSelect={setSelectedPaymentModeSub}
                placeholder="Select Payment Mode"
              />
            )}

            {error.type === 'selectedPaymentModeSub' && (
              <Text style={{ color: 'red', fontSize: 16 }}>
                {error.message}
              </Text>
            )}

            <CustomDropdown
              label="Amount Type *"
              options={['Credit', 'Debit']}
              selected={selectedPaymentType}
              onSelect={setSelectedPaymentType}
              placeholder="Select Amount Type"
            />

            {error.type === 'selectedPaymentType' && (
              <Text style={{ color: 'red', fontSize: 16 }}>
                {error.message}
              </Text>
            )}

            <InputField
              label="Reasone *"
              placeholder="Enter your reason"
              icon="question"
              type="AntDesign"
              value={reasone}
              onChangeText={setReasone}
              keyboardType="default"
            />

            {error.type === 'reasone' && (
              <Text style={{ color: 'red', fontSize: 16 }}>
                {error.message}
              </Text>
            )}

            <CustomButton
              title="Submit"
              icon="send"
              onPress={handlePress}
              loading={loading}
              backgroundColor="#28a745"
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});

export default AddScreen;
