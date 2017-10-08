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

class LikedJobsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Favs',
    tabBarIcon: () => <Icon name="favorite" color={globalTheme.colors.white['200']} />,
  };

  componentDidMount() {}

  render() {
    return (
      <View style={stylesheet.container}>
        <Text>LikedJobsScreen</Text>
      </View>
    );
  }
}

LikedJobsScreen.propTypes = {};

LikedJobsScreen.defaultProps = {};

export default LikedJobsScreen;
