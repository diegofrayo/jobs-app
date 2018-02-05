// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Keyboard, TextInput, View } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// rn-elements
import { Icon } from 'react-native-elements';

// components
import CustomText from './../components/CustomText';
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
    borderBottomWidth: 0,
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
    marginBottom: theme.spacing[2],
    marginTop: theme.spacing[2],
  },
  jobsList: {
    paddingRight: theme.spacing.base,
  },
  separator: {
    backgroundColor: theme.color.white[200],
    height: 1,
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

  anySearchWasExecuted = false;
  searchInputText = '';

  onPressSearch = () => {
    if (this.searchInputText) {
      this.anySearchWasExecuted = true;
      this.props.data.refetch({ query: this.searchInputText });
    }
    Keyboard.dismiss();
  };

  onChangeInput = (text) => {
    this.searchInputText = text;
  };

  renderSeparator = () => <View style={stylesheet.separator} />;

  renderItem = ({ item }) => <JobItem {...item} />;

  renderContent = ({ loading, error, jobs }) => {

    if (this.anySearchWasExecuted) {
      if (loading) {
        return <CustomText>Cargando...</CustomText>;
      }

      if (error) {
        return (
          <CustomText>
            Lo sentimos, ha ocurrido un error, inténtalo de nuevo en un momento
          </CustomText>
        );
      }

      if (!jobs.length) {
        return <CustomText>No hay resultados para {this.searchInputText}</CustomText>;
      }

      return (
        <FlexContainer>
          <CustomText style={stylesheet.resultsText}>
            Se encontraron {jobs.length} resultados para {this.searchInputText}
          </CustomText>
          <FlatList
            data={jobs}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={JobItem.keyExtractor}
            renderItem={this.renderItem}
            style={stylesheet.jobsList}
          />
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
            autoCorrect={false}
            clearButtonMode="while-editing"
            multiline={false}
            onChangeText={this.onChangeInput}
            onSubmitEditing={this.onPressSearch}
            placeholder="Busca un trabajo..."
            returnKeyType="search"
            style={stylesheet.searchBarInput}
            underlineColorAndroid="transparent"
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
