import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
	static navigationOptions = {
    title: "Auth",
	};	
	
	componentDidMount() {
		this.props.facebookLogin();
		this.onAuthComplete(nextProps)
		//AsyncStorage.removeItem('fb_token');   // test flow with new state
	}

	componentWillReceiveProps(nextProps) {
		this.onAuthComplete(nextProps)
	}

	onAuthComplete(props) {
		if (props.token) {
			this.props.navigation.navigate('map');
		}
	}

	render() {
		return (
			<View />
		);
	}
}
const mapStateToProps = ({ auth }) => {
	return {
		token: auth.token
	}
}

export default connect(mapStateToProps, actions)(AuthScreen);
