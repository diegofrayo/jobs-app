// npm libs
import React from 'react';
import { View, Text } from 'react-native';
// import PropTypes from 'prop-types';

// rn-elements
import { Icon } from 'react-native-elements';

class LikedJobsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Favs',
    tabBarIcon: () => <Icon name="favorite" color="#FFFFFF" />,
  };

  componentDidMount() {}

  render() {
    return (
      <View>
        <Text>LikedJobsScreen</Text>
      </View>
    );
  }
}

LikedJobsScreen.propTypes = {};

LikedJobsScreen.defaultProps = {};

export default LikedJobsScreen;
