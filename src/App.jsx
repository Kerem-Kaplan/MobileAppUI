import React from 'react';
import LoginScreen from './screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupScreen from './screens/User/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/User/HomeScreen';
import MyTabs from './navigation/User/UserMainPageBottomNavigation';
import Navigation from './navigation/NavigationContainer';

import {View, Text, Button} from 'react-native';
import store from './redux/store/store';
import {decrement, increment} from './redux/actions/actions';
import CounterComponent from './components/CounterComponent';
import ModalListe from './components/ModalListe';

const App = () => {
  return <Navigation></Navigation>;
};

export default App;
