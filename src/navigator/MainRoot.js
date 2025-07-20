import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import SplashScreen from '../screens/SplashScreen';
import SettingScreen from '../screens/SettingScreen';
import AddScreen from '../screens/AddScreen';

const Stack = createNativeStackNavigator();

const MainRoot = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen
        name="addMoney"
        options={{ headerShown: true, title: 'Add Your Money' }}
        component={AddScreen}
      />
      <Stack.Screen name="Bottom" component={BottomTabNavigator} />
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default MainRoot;

const styles = StyleSheet.create({});
