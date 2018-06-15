import React from 'react';
import {StackNavigator} from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './components/Views/HomePage';

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}

export const RootStack = StackNavigator(
  {
    HomePage: { screen: HomePage },
  },
  {
    initialRouteName: 'HomePage',
    headerMode: 'none'
  }
);

