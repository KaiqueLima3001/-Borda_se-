import React from 'react';
import { StatusBar,StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Login from './src/pages/login';
import Routes from './src/routes/index.routes';
import {themas} from './src/global/themes'


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#F5C518' barStyle="dark-content"/>
      <Routes/>
    </NavigationContainer>
  );
}
