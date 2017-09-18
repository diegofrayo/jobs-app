import React, { Component } from "react";
import _ from 'lodash';
import { View, Text, AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import Slides from "../components/Slides";

const SLIDE_DATA = [
  {
		text: "random text 1",
		color: "#03A9F4"
	},
  {
		text: "random text 2",
		color: "#BA68C8"
	},
	{
		text: "random text 3",
		color: "#03A9F4"
	}
];

class WelcomeScreen extends Component {
  static navigationOptions = {
    title: "Welcome"
	};

	state = {
		token: null
	}

	async componentWillMount() {
		let token = await AsyncStorage.getItem('fb_token');
		
		if (token) {
			this.props.navigation.navigate('map');
			this.setState({ token });
		} else {
			this.setState({ token: false })
		}
	}

	onSlidesComplete = () => {
		this.props.navigation.navigate('auth');
	}

  render() {
		if (_.isNull(this.state.token)) {
			return <AppLoading />
		}

    return (
      <View style={{ flex: 1 }}>
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      </View>
    );
  }
}

export default WelcomeScreen;
