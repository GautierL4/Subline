import React from 'react';
import {createStackNavigator} from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './components/Views/HomePage';

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}

export const RootStack = createStackNavigator(
  {
    HomePage: { screen: HomePage },
  },
  {
    initialRouteName: 'HomePage',
    headerMode: 'none'
  }
);

