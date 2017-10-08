// npm libs
import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// rn-elements
import { SearchBar, Icon, Text } from 'react-native-elements';

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
  inputContainer: {},
  input: {},
  resultsText: {
    marginTop: theme.spacing,
  },
  list: {
    marginTop: theme.spacing * 2,
    paddingRight: theme.spacing * 1.5,
  },
}));

class JobsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Search',
    tabBarIcon: () => <Icon name="search" color={globalTheme.colors.white['200']} />,
  };

  constructor() {
    super();
    this.state = {
      searchInputText: '',
    };
  }

  componentDidMount() {
    // for testing
    this.props.actions.fetchJobs('text');
  }

  onChangeText = text => {
    console.log(text);
    this.setState({
      searchInputText: text,
    });
  };

  createResultsText = (results, searchInputText) => {
    if (results.length === 0) {
      return `No hay resultados para ${searchInputText}`;
    }
    return `Se encontraron ${results.length} resultados para ${searchInputText}`;
  };

  keyExtractor = (item, index) => `job-item-${index}`;

  renderItem = ({ item }) => <JobItem {...item} />;

  render() {
    const { results } = this.props.jobs;
    return (
      <View style={stylesheet.container}>
        <SearchBar
          containerStyle={this.inputContainer}
          inputStyle={this.input}
          onChangeText={this.onChangeText}
          placeholder="Search a job"
          lightTheme
          clearIcon
        />
        <Text style={stylesheet.resultsText}>
          {this.createResultsText(results, this.state.searchInputText)}
        </Text>
        <FlatList
          style={stylesheet.list}
          data={results}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
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
