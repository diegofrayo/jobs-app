// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Keyboard, TextInput, View } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// rn-elements
import { Icon, Text } from 'react-native-elements';

// components
import FlexContainer from './../components/FlexContainer';
import JobItem from './../components/Job';

// styles
import createStylesheet, { theme as globalTheme } from './../styles/createStylesheet';

const stylesheet = createStylesheet(theme => ({
  container: {
    display: 'flex',
    flex: 1,
    padding: theme.spacing[2],
    paddingBottom: 0,
  },
  searchBarFlexContainer: {
    backgroundColor: theme.color.white[200],
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
  searchBarInput: {
    flex: 1,
    fontSize: theme.fontSize.small,
    height: theme.spacing[5],
  },
  searchBarButton: {
    flex: 0,
    height: theme.spacing[5],
    paddingBottom: theme.spacing.base + 2,
    paddingLeft: theme.spacing.base + 2,
    paddingRight: theme.spacing[2],
    paddingTop: theme.spacing.base + 2,
  },
  resultsText: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing[2],
    marginBottom: theme.spacing[2],
  },
}));

const searchJobsQuery = gql`
  query JobsQuery($query: String!) {
    jobs(query: $query) {
      description
      pubDate
      title
      url
      website
    }
  }
`;

class JobsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Buscar',
    tabBarIcon: () => <Icon name="search" color={globalTheme.color.white[600]} />,
  };

  static propTypes = {
    data: PropTypes.shape({
      error: PropTypes.object,
      loading: PropTypes.bool.isRequired,
      refetch: PropTypes.func,
      jobs: PropTypes.array,
    }).isRequired,
  };

  /* eslint-disable */
  anySearchWasExecuted = false;
  searchInputText = '';
  /* eslint-enable */

  onPressSearch = () => {
    if (this.searchInputText) {
      this.anySearchWasExecuted = true;
      this.props.data.refetch({ query: this.searchInputText });
      Keyboard.dismiss();
    }
  };

  onChangeInput = text => {
    this.searchInputText = text;
  };

  keyExtractor = (item, index) => `job-item-${index}`;

  renderItem = ({ item }) => <JobItem {...item} />;

  renderContent = ({ loading, error, jobs }) => {
    if (this.anySearchWasExecuted) {
      if (loading) {
        return <Text>Cargando...</Text>;
      }

      if (error) {
        console.log(error);
        return <Text>Lo sentimos, ha ocurrido un error, inténtalo de nuevo en un momento</Text>;
      }

      if (!jobs.length) {
        return <Text>No hay resultados para {this.searchInputText}</Text>;
      }

      return (
        <FlexContainer>
          <Text style={stylesheet.resultsText}>
            Se encontraron {jobs.length} resultados para {this.searchInputText}
          </Text>
          <FlatList data={jobs} keyExtractor={this.keyExtractor} renderItem={this.renderItem} />
        </FlexContainer>
      );
    }

    return null;
  };

  render() {
    return (
      <View style={stylesheet.container}>
        <View style={stylesheet.searchBarFlexContainer}>
          <Icon
            color={globalTheme.color.white[500]}
            name="search"
            onPress={this.onPressSearch}
            size={globalTheme.spacing.base * 2.5}
            style={stylesheet.searchBarButton}
          />
          <TextInput
            onChangeText={this.onChangeInput}
            onSubmitEditing={this.onPressSearch}
            placeholder="Busca un trabajo..."
            style={stylesheet.searchBarInput}
          />
        </View>
        <FlexContainer>{this.renderContent(this.props.data)}</FlexContainer>
      </View>
    );
  }
}

export default graphql(searchJobsQuery, {
  options: {
    variables: {
      query: '',
    },
  },
})(JobsScreen);
