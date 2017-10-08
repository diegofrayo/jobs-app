// npm libs
import React from 'react';
import { View, Text } from 'react-native';
// import PropTypes from 'prop-types';

// rn-elements
import { Icon } from 'react-native-elements';

// styles
import createStylesheet, { theme as globalTheme } from './../styles/createStylesheet';

const stylesheet = createStylesheet(theme => ({
  container: {
    padding: theme.spacing * 2,
    paddingBottom: theme.tabsHeight,
  },
}));

class SettingsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: () => <Icon name="settings" color={globalTheme.colors.white['200']} />,
  };

  componentDidMount() {}

  render() {
    return (
      <View style={stylesheet.container}>
        <Text>SettingsScreen</Text>
      </View>
    );
  }
}

SettingsScreen.propTypes = {};

SettingsScreen.defaultProps = {};

export default SettingsScreen;
