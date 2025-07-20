import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import UniversalIcon from './UniversalIcon';

const FabAction = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center' }}
        onPress={onPress}
      >
        <UniversalIcon
          name="add-circle-sharp"
          type="Ionicons"
          color="orange"
          size={50}
        />
        <Text style={styles.TextStyle}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FabAction;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 15,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
});
