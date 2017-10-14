// npm libs
import React from 'react';
import { View, FlatList, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextInput, Button as RNButton } from 'react-native';

// rn-elements
import { Button, FormInput, Icon, Text, SearchBar } from 'react-native-elements';

// components
import JobItem from './../components/Job';

// redux
import { fetchJobs as fetchJobsAction } from './../redux/ducks/jobs';

// styles
import createStylesheet, { theme as globalTheme } from './../styles/createStylesheet';

const stylesheet = createStylesheet(theme => ({
  container: {
    padding: theme.spacing * 2,
    paddingBottom: theme.tabsHeight,
  },
  searchBarContainer: {
    backgroundColor: theme.colors.white[100],
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
    height: theme.spacing * 5,
    width: '100%',
  },
  searchBarButtonContainer: {
    flexShrink: 0,
  },
  searchBarButton: {
    backgroundColor: 'transparent',
    height: theme.spacing * 5,
    padding: theme.spacing,
  },
  resultsText: {
    marginTop: theme.spacing * 2,
  },
  list: {
    marginTop: theme.spacing * 2,
    paddingRight: theme.spacing * 1.5,
  },
}));

class JobsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Search',
    tabBarIcon: () => <Icon name="search" color={globalTheme.colors.white[600]} />,
  };

  /* eslint-disable */
  anySearchWasExecuted = false;
  searchInputText = '';
  /* eslint-enable */

  onPressSearch = () => {
    if (this.searchInputText) {
      this.anySearchWasExecuted = true;
      this.props.actions.fetchJobs(this.searchInputText);
      Keyboard.dismiss();
    }
  };

  onChangeInput = text => {
    this.searchInputText = text;
  };

  keyExtractor = (item, index) => `job-item-${index}`;

  renderItem = ({ item }) => <JobItem {...item} />;

  renderResultsText = (results, searchInputText) => {
    if (this.anySearchWasExecuted === true) {
      if (results.length === 0) {
        return `No hay resultados para ${searchInputText}`;
      }
      return `Se encontraron ${results.length} resultados para ${searchInputText}`;
    }
    return null;
  };

  render() {
    const { results } = this.props.jobs;
    return (
      <View style={stylesheet.container}>
        <View style={stylesheet.searchBarContainer}>
          <Button
            containerViewStyle={stylesheet.searchBarButtonContainer}
            buttonStyle={stylesheet.searchBarButton}
            icon={{
              name: 'search',
              color: globalTheme.colors.black[700],
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
            backgroundColor: globalTheme.colors.white[100],
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
            color={globalTheme.colors.black[700]}
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
        <Text style={stylesheet.resultsText}>
          {this.renderResultsText(results, this.searchInputText)}
        </Text>
        <FlatList
          data={results}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          style={stylesheet.list}
        />
      </View>
    );
  }
}

JobsScreen.propTypes = {
  actions: PropTypes.object.isRequired,
  jobs: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  jobs: state.jobs,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    fetchJobs: query => dispatch(fetchJobsAction(query)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(JobsScreen);
