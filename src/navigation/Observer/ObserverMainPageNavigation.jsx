import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faTableList, faUser} from '@fortawesome/free-solid-svg-icons';
import HomeScreen from '../../screens/Observer/HomeScreen';
import MenuPageNavigation from './MenuPageNavigation';
import ProfilePageNavigation from './ProfilePageNavigation';
import React, {useEffect, useRef} from 'react';
import {
  BackHandler,
  Alert,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {removeToken} from '../../helpers/tokens';
import {Animated, Easing} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TransitionPresets} from '@react-navigation/stack';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
/* const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={{flexDirection: 'row', height: 50, backgroundColor: '#eee'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
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
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: isFocused ? 'blue' : 'black'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}; */
function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
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
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const ObserverMainPageBottomNavigation = () => {
  /* useEffect(() => {
    const backAction = () => {
      Alert.alert('Uygulamadan çıkmak istediğinize emin misiniz?', '', [
        {
          text: 'Hayır',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            navigation.navigate('Login'); // Uygulamadan çıkış yap
            await removeToken();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); 
  }, []); */
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#000000',
      }}>
      <Tab.Screen
        name="ObserverHome"
        navigationKey="Home"
        component={HomeScreen}
        options={{
          title: 'Home',

          headerStyle: {
            backgroundColor: '#17c428',
            borderBottomWidth: 2,
            borderBottomColor: '#000000',
            height: 0,
          },
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faHome} color={'#17c428'} size={size} />
          ),
          tabBarActiveBackgroundColor: '#c4c4c4',
        }}
      />

      <Tab.Screen
        name="ObserverMenu"
        component={MenuPageNavigation}
        options={{
          tabBarLabel: 'Menu',
          headerStyle: {
            backgroundColor: '#17c428',
            borderBottomWidth: 2,
            borderBottomColor: '#000000',
            height: 0,
          },
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faTableList} color={'#17c428'} size={size} />
          ),
          tabBarActiveBackgroundColor: '#c4c4c4',
        }}
      />
      <Tab.Screen
        name="ObserverProfile"
        component={ProfilePageNavigation}
        options={{
          tabBarLabel: 'Profile',
          headerStyle: {
            backgroundColor: '#17c428',
            borderBottomWidth: 2,
            borderBottomColor: '#000000',
            height: 0,
          },
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faUser} color={'#17c428'} size={size} />
          ),
          tabBarActiveBackgroundColor: '#c4c4c4',
        }}
      />
    </Tab.Navigator>
  );
};

export default ObserverMainPageBottomNavigation;
