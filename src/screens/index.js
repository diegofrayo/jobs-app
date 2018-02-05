// npm libs
import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Platform, View } from 'react-native';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Font } from 'expo';

// screens
import JobsScreen from './JobsScreen';
import InfoScreen from './InfoScreen';

// constants
import constants from './../constants';

// styles
import createStylesheet, { theme as globalTheme } from './../styles/createStylesheet';

const stylesheet = createStylesheet(theme => ({
  viewContainer: {
    flex: 1,
    paddingTop: theme.statusBarHeight,
  },
  mainNavigator: {
    width: theme.screenWidth,
  },
}));

const tabBarOptions = Platform.select({
  android: {
    activeTintColor: globalTheme.tabBar.activeTintColor,
    inactiveTintColor: globalTheme.tabBar.inactiveTintColor,
    showIcon: true,
    scrollEnabled: false,
    tabStyle: {
      padding: 0,
    },
    labelStyle: {
      fontSize: globalTheme.fontSize.xsmall - 2,
    },
    indicatorStyle: {
      backgroundColor: globalTheme.tabBar.activeTintColor,
    },
    style: {
      backgroundColor: globalTheme.tabBar.backgroundColor,
      borderTopColor: globalTheme.tabBar.borderTopColor,
      borderTopWidth: globalTheme.tabBar.borderTopWidth,
    },
  },
  ios: {
    labelStyle: {
      fontSize: globalTheme.fontSize.normal,
    },
  },
});

export default class App extends React.Component {

  client = new ApolloClient({
    networkInterface: createNetworkInterface({
      uri: `${constants.BACKEND_URL}/graphql`,
    }),
  });

  mainNavigator = TabNavigator(
    {
      Home: { screen: JobsScreen },
      Info: { screen: InfoScreen },
    },
    {
      tabBarPosition: 'bottom',
      swipeEnabled: true,
      lazy: true,
      animationEnabled: true,
      tabBarOptions: {
        showLabel: true,
        ...tabBarOptions,
      },
    },
  );

  state = {
    isReady: false,
  };

  componentDidMount() {
    Font
      .loadAsync({
        'open-sans-bold': require('./../../assets/fonts/OpenSans-Bold.ttf'),
        'open-sans': require('./../../assets/fonts/OpenSans-Light.ttf'),
      })
      .then(() => this.setState({ isReady: true }));
  }

  render() {
    const MainNavigator = this.mainNavigator;
    return this.state.isReady ? (
      <ApolloProvider client={this.client}>
        <View style={stylesheet.viewContainer}>
          <MainNavigator style={stylesheet.mainNavigator} />
        </View>
      </ApolloProvider>
    ) : null;
  }
}
