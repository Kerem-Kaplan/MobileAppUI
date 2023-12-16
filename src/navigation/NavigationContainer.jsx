import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/User/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import UserMainPageBottomNavigation from './User/UserMainPageBottomNavigation';
import ObserverMainPageBottomNavigation from './Observer/ObserverMainPageNavigation';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTintColor: '#000000',
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Login Screen'}}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{title: 'Signup Screen'}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{title: 'Forgot Password Screen'}}
        />
        <Stack.Screen
          name="UserMain"
          component={UserMainPageBottomNavigation}
          options={{
            headerLeft: null,
            headerStyle: {
              height: 0,
            },
          }}
        />
        <Stack.Screen
          name="ObserverMain"
          component={ObserverMainPageBottomNavigation}
          options={{
            headerLeft: null,
            headerStyle: {
              height: 0,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
