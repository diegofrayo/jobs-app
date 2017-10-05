// npm libs
import React from 'react';
import { Provider } from 'react-redux';
import { TabNavigator } from 'react-navigation';
import { View, Dimensions } from 'react-native';
import { Constants } from 'expo';

// screens
import JobsScreen from './JobsScreen';
import LikedJobsScreen from './LikedJobsScreen';
import SettingsScreen from './SettingsScreen';

// redux
import store from './../redux';

// styles
import createStylesheet, { theme } from './../styles/createStylesheet';

const stylesheet = createStylesheet(() => ({
  viewContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  mainNavigator: {
    width: Dimensions.get('window').width,
  },
}));

export default class App extends React.Component {
  mainNavigator = TabNavigator(
    {
      main: {
        screen: TabNavigator(
          {
            jobs: { screen: JobsScreen },
            likedJobs: { screen: LikedJobsScreen },
            settings: { screen: SettingsScreen },
          },
          {
            tabBarPosition: 'bottom',
            swipeEnabled: true,
            lazy: true,
            animationEnabled: true,
            tabBarOptions: {
              activeTintColor: '#AAAAAA',
              activeBackgroundColor: '#000000',
              inactiveTintColor: '#CCCCCC',
              inactiveBackgroundColor: '#333333',
              labelStyle: {
                fontSize: 12,
              },
              style: {
                backgroundColor: 'blue',
              },
            },
          },
        ),
      },
    },
    {
      tabBarPosition: 'bottom',
      swipeEnabled: true,
      lazy: true,
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: '#000000',
        activeBackgroundColor: '#000000',
        inactiveTintColor: '#000000',
        inactiveBackgroundColor: '#000000',
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: 'blue',
        },
      },
    },
  );

  render() {
    const MainNavigator = this.mainNavigator;
    return (
      <Provider store={store}>
        <View style={stylesheet.viewContainer}>
          <MainNavigator style={stylesheet.mainNavigator} />
        </View>
      </Provider>
    );
  }
}
