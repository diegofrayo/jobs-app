import React from "react";
import Expo, { Notifications } from 'expo';
import { Constants } from "expo";
import { Text, View, Dimensions, Alert } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import registerForNotifications from './services/push_notifications'
import store from "./store";
import AuthScreen from "./screens/AuthScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import MapScreen from "./screens/MapScreen";
import DeckScreen from "./screens/DeckScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ReviewScreen from "./screens/ReviewScreen";

//const SCREEN_HEIGHT = Dimensions.get('window').height;
//const SCREEN_WIDTH = Dimensions.get('window').width;


export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }]
        )
      }      
    })
  }

  render() {
    // import me
    const MainNavigator = TabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        main: {
          screen: TabNavigator(
            {
              map: { screen: MapScreen },
              deck: { screen: DeckScreen },
              review: {
                screen: StackNavigator({
                  review: { screen: ReviewScreen },
                  settings: { screen: SettingsScreen }
                })
              }
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
                  top: -5
                },                  
                style: {
                  height: 50,                
                  backgroundColor: '#009688'
                }
              }
            }
          )
        }
      },
      {        
        navigationOptions: {
          tabBarVisible: false
        },
        tabBarPosition: "bottom",
        swipeEnabled: false,
        lazy: true,
        animationEnabled: false
      }
    );

    return (
      <Provider store={store}>
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
          <MainNavigator style={{ width: Dimensions.get("window").width }} />
        </View>
      </Provider>
    );
  }
}
