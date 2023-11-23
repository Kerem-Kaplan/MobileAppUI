import React from 'react';
import LoginScreen from './screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupScreen from './screens/User/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/User/HomeScreen';
import MyTabs from './navigation/User/MainPageBottomNavigation';
import Navigation from './navigation/NavigationContainer';

const App = () => {
  return <Navigation></Navigation>;
};

export default App;
