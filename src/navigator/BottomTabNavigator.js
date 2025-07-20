import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import UniversalIcon from '../components/UniversalIcon';
import DashboardScreen from '../screens/DashboardScreen';
import AllTransactionScreen from '../screens/AllTransactionScreen';
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
              backgroundColor: 'lightgray',
              padding: 10,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderTopColor: isFocused ? 'green' : 'lightgray',
              borderTopWidth: 5,
            }}
          >
            {route.name == 'profile' && (
              <UniversalIcon
                color={isFocused ? 'green' : 'black'}
                size={isFocused ? 30 : 25}
                type="FontAwesome"
                name={isFocused ? 'user' : 'user-o'}
              />
            )}

            {route.name == 'AllTransaction' && (
              <UniversalIcon
                color={isFocused ? 'green' : 'black'}
                size={isFocused ? 30 : 25}
                type="Ionicons"
                name={isFocused ? 'add' : 'add-outline'}
              />
            )}
            {route.name == 'dashboard' && (
              <UniversalIcon
                color={isFocused ? 'green' : 'black'}
                size={isFocused ? 30 : 25}
                type="Ionicons"
                name={isFocused ? 'bar-chart' : 'bar-chart-outline'}
              />
            )}

            <Text
              style={{
                color: isFocused ? 'green' : 'black',
                fontSize: isFocused ? 18 : 14,
              }}
            >
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
    <Tab.Navigator
      initialRouteName="AllTransaction"
      tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="dashboard"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name="AllTransaction"
        component={AllTransactionScreen}
        options={{ title: 'Transaction' }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
