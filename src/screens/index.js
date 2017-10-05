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
import createStylesheet from './../styles/createStylesheet';

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
            swipeEnabled: false,
            lazy: true, // Each screen will not mount/load until user clicks on them
            animationEnabled: false,
            tabBarOptions: {
              showIcon: true,
              labelStyle: { fontSize: 12, top: -10 },
              iconStyle: {
                width: 22,
                height: 22,
                top: -5,
              },
              style: {
                height: 50,
                backgroundColor: '#009688',
              },
            },
          },
        ),
      },
    },
    {
      navigationOptions: { tabBarVisible: false },
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      lazy: true,
      animationEnabled: false,
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
