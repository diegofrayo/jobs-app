// npm libs
import React from 'react';
import { View, Text } from 'react-native';
// import PropTypes from 'prop-types';

// rn-elements
import { Icon } from 'react-native-elements';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: () => <Icon name="settings" color="#FFFFFF" />,
  };

  componentDidMount() {}

  render() {
    return (
      <View>
        <Text>SettingsScreen</Text>
      </View>
    );
  }
}

SettingsScreen.propTypes = {};

SettingsScreen.defaultProps = {};

export default SettingsScreen;
