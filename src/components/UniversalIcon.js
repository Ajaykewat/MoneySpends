// components/UniversalIcon.js
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';

const ICON_SETS = {
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  Entypo,
  Feather,
  EvilIcons,
  AntDesign,
  Foundation,
  Octicons,
};

const UniversalIcon = ({
  type = 'FontAwesome',
  name,
  size = 24,
  color = '#000',
  ...props
}) => {
  const IconComponent = ICON_SETS[type];

  if (!IconComponent) {
    console.warn(`Icon type "${type}" not found.`);
    return null;
  }

  return <IconComponent name={name} size={size} color={color} {...props} />;
};

export default UniversalIcon;
