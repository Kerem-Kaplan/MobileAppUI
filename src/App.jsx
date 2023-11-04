import React, {useEffect, useState} from 'react';
import LoginScreen from './screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
  )
};

export default App;
