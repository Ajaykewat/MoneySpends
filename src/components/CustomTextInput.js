import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import UniversalIcon from './UniversalIcon';

const CustomTextInput = ({
  editable,
  handleInput,
  value,
  placeholder,
  onFocus,
  onBlur,
  ref,
}) => {
  return (
    <View style={styles.container}>
      <UniversalIcon type="AntDesign" name="idcard" color="gray" size={30} />
      <TextInput
        ref={ref}
        editable={editable}
        placeholder={placeholder}
        value={value}
        onChangeText={handleInput}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
