import React, { Component } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import * as actions from '../actions';
import Swipe from '../components/Swipe';

class DeckScreen extends Component {
	static navigationOptions = ({ navigation: { navigate } }) => {
		return {
			tabBarLabel: "Jobs",
			tabBarIcon: ({ tintColor }) => <Icon name="description" size={15} color={tintColor} />,
		}	
	};
	renderCard(job) {
		const initialRegion = {
			longitude: job.longitude,
			latitude: job.latitude,
			latitudeDelta: 0.045,
			longitudeDelta: 0.02
		};

		return (
			<Card title={job.jobtitle}>
				<View style={{ height: 300 }} >
					<MapView 
						scrollEnabled={false}
						style={{ flex: 1 }}
						cacheEnabled={Platform.OS === 'android'}
						initialRegion={initialRegion}
					>
					</MapView>
					<View style={styles.detailWrapper}>
						<Text>{job.company}</Text>
						<Text>{job.formattedRelativeTime}</Text>
					</View>
					<Text>
						{job.snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}
					</Text>
				</View>
			</Card>
		)
	}

	renderNoMoreCards = () => {
		return (
			<Card title="No more cards">
				<Button
					title="Back To Map"
					large
					icon={{ name: 'my-location' }}
					backgroundColor="#03A9FA"
					onPress={() => this.props.navigation.navigate('map')}
				/>
			</Card>
		)
	}
	render() {
		return (
			<View>
				<Swipe 
					data={this.props.jobs}
					renderCard={this.renderCard}
					renderNoMoreCards={this.renderNoMoreCards}
					onSwipeRight={job => this.props.likeJob(job)}
					keyProp="jobkey"
				/>
			</View>
		);
	}
}

const styles = {
	detailWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 10
	}
}

const mapStateToProps = ({ jobs }) => {
	return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);