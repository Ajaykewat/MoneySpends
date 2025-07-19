import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import SwipeButton from '../components/SwipeButton';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Tracking</Text>
      <LottieView
        source={require('../assets/LottieFiles/RupeeCoin.json')}
        autoPlay
        loop
        style={{ width: 500, height: 500 }}
      />
      <SwipeButton onSwipeSuccess={() => navigate.replace('Bottom')} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
});
