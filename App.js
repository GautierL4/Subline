import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Easing, Animated, StatusBar } from 'react-native';
import HomePage from './components/Views/HomePage';
import SearchPage from './components/Views/SearchPage';
import MapPage from './components/Views/MapPage';
import DisplayJourneysPage from './components/Views/DisplayJourneysPage';
import JourneyPage from './components/Views/JourneyPage';
import TimeTablePage from './components/Views/TimeTablePage';
import ListOfStopPage from './components/Views/ListOfStopPage';

StatusBar.setBackgroundColor('#000');
StatusBar.setBarStyle('light-content');
StatusBar.setTranslucent(true);

const App = () => <RootStack />;

export default App;

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 800,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
      delay: 100
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;
      const height = layout.initHeight;

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 1, 1]
      });

      const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
      });

      return { transform: [{ scaleX: scale }, { scaleY: scale }], opacity };
    }
  };
};

export const RootStack = createStackNavigator(
  {
    HomePage: { screen: HomePage },
    SearchPage: { screen: SearchPage },
    DepartureSearchPage: { screen: SearchPage },
    JourneyPage: { screen: JourneyPage },
    MapPage: { screen: MapPage },
    DisplayJourneysPage: { screen: DisplayJourneysPage },
    TimeTablePage: { screen: TimeTablePage },
    ListOfStopPage: { screen: ListOfStopPage }
  },
  {
    initialRouteName: 'HomePage',
    headerMode: 'none',
    transitionConfig
  }
);
