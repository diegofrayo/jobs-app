// npm libs
import React from 'react';
// import { Provider } from 'react-redux';
import { TabNavigator } from 'react-navigation';
import { View, Dimensions } from 'react-native';
import { Constants } from 'expo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

// screens
import JobsScreen from './JobsScreen';
import LikedJobsScreen from './LikedJobsScreen';
import SettingsScreen from './SettingsScreen';

// redux
// import store from './../redux';

// constants
import constants from './../constants';

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

export default class App extends React.PureComponent {
  mainNavigator = TabNavigator(
    {
      Home: { screen: JobsScreen },
      LikedJobs: { screen: LikedJobsScreen },
      Settings: { screen: SettingsScreen },
    },
    {
      tabBarPosition: 'bottom',
      swipeEnabled: true,
      lazy: true,
      animationEnabled: true,
      tabBarOptions: {
        showLabel: true,
        style: {},
        labelStyle: {
          fontSize: theme.fontSize.normal,
        },
        tabStyle: {},
      },
    },
  );

  client = new ApolloClient({
    networkInterface: createNetworkInterface({
      uri: `${constants.BACKEND_URL}/graphql`,
    }),
  });

  render() {
    const MainNavigator = this.mainNavigator;
    // return (
    //   <ApolloProvider client={this.client}>
    //     <Provider store={store}>
    //       <View style={stylesheet.viewContainer}>
    //         <MainNavigator style={stylesheet.mainNavigator} />
    //       </View>
    //     </Provider>
    //   </ApolloProvider>
    // );
    return (
      <ApolloProvider client={this.client}>
        <View style={stylesheet.viewContainer}>
          <MainNavigator style={stylesheet.mainNavigator} />
        </View>
      </ApolloProvider>
    );
  }
}
