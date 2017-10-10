// npm libs
import React from 'react';
import { View, FlatList, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// rn-elements
import { Button, FormInput, Icon, Text } from 'react-native-elements';

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
    justifyContent: 'space-around',
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
    alignSelf: 'flex-end',
    flexShrink: 0,
  },
  searchBarButton: {
    height: theme.spacing * 5,
    padding: 0,
    paddingLeft: theme.spacing,
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
    tabBarIcon: () => <Icon name="search" color={globalTheme.colors.white[200]} />,
  };

  anySearchWasExecuted = false;
  searchInputText = '';

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
          <FormInput
            containerStyle={stylesheet.searchBarInputContainer}
            inputStyle={stylesheet.searchBarInput}
            onChangeText={this.onChangeInput}
            onSubmitEditing={this.onPressSearch}
            placeholder="Search a job..."
          />
          <Button
            containerViewStyle={stylesheet.searchBarButtonContainer}
            buttonStyle={stylesheet.searchBarButton}
            icon={{ name: 'search' }}
            onPress={this.onPressSearch}
            raised
          />
        </View>
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
