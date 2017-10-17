// npm libs
import React from 'react';
import { View, TextInput } from 'react-native';
// import PropTypes from 'prop-types';

// rn-elements
import { Button, FormInput, Icon, Text, SearchBar } from 'react-native-elements';

// constants
import constants from './../constants';

// styles
import createStylesheet, { theme as globalTheme } from './../styles/createStylesheet';

const stylesheet = createStylesheet(theme => ({
  container: {
    padding: theme.spacing[2],
    paddingBottom: theme.tabsHeight,
  },
  searchBarContainer: {
    backgroundColor: theme.color.white[400],
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
  searchBarInputContainer: {
    borderBottomWidth: 0,
    flex: 1,
  },
  searchBarInput: {
    height: theme.spacing[5],
    width: '100%',
  },
  searchBarButtonContainer: {
    flexShrink: 0,
  },
  searchBarButton: {
    backgroundColor: 'transparent',
    height: theme.spacing[5],
    padding: theme.spacing.base,
  },
}));

class SettingsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Info',
    tabBarIcon: () => <Icon name="info" color={globalTheme.color.white[600]} />,
  };

  render() {
    return (
      <View style={stylesheet.container}>
        <Text>SettingsScreen</Text>
        <Text>ENV: {__DEV__ ? 'Development' : 'Production'}</Text>
        <Text>HOST: {constants.BACKEND_URL}</Text>
        <View style={{ marginTop: 10 }}>
          <View style={stylesheet.searchBarContainer}>
            <Button
              containerViewStyle={stylesheet.searchBarButtonContainer}
              buttonStyle={stylesheet.searchBarButton}
              icon={{
                name: 'search',
                color: globalTheme.color.black[700],
                style: { marginRight: 0 },
              }}
              onPress={this.onPressSearch}
            />
            <FormInput
              containerStyle={stylesheet.searchBarInputContainer}
              inputStyle={stylesheet.searchBarInput}
              onChangeText={this.onChangeInput}
              onSubmitEditing={this.onPressSearch}
              placeholder="My own search bar with RNE"
            />
          </View>
          <View
            style={{
              backgroundColor: globalTheme.color.white[400],
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <Icon
              name="search"
              size={20}
              color={globalTheme.color.black[700]}
              style={{
                flex: 0,
                height: 40,
                paddingBottom: 10,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
              }}
            />
            <TextInput
              placeholder="My own search bar with RN"
              style={{ flex: 1, height: 40, fontSize: 14 }}
            />
          </View>
          <SearchBar round lightTheme placeholder="RNE Searchbar" />
        </View>
      </View>
    );
  }
}

export default SettingsScreen;
