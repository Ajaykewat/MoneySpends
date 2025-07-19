import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import AddScreen from '../screens/AddScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import UniversalIcon from '../components/UniversalIcon';
const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        console.log('route.name', route.name);
        return (
          <Pressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: 'gray',
              padding: 10,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            {route.name == 'profile' && (
              <UniversalIcon
                color={isFocused ? 'white' : 'black'}
                type="Feather"
                name={'user'}
              />
            )}

            {route.name == 'addExpenses' && (
              <UniversalIcon
                color={isFocused ? 'white' : 'black'}
                type="Ionicons"
                name={'add'}
              />
            )}
            {route.name == 'dashboard' && (
              <UniversalIcon
                color={isFocused ? 'white' : 'black'}
                type="Entypo"
                name={'bar-graph'}
              />
            )}

            <Text style={{ color: isFocused ? 'white' : 'black' }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="dashboard" component={DashboardScreen} />
      <Tab.Screen name="addExpenses" component={AddScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
