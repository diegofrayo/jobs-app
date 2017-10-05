// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import { Text, Alert, Linking, TouchableOpacity, View } from 'react-native';

// styles
import createStylesheet from './../styles/createStylesheet';

const stylesheet = createStylesheet(theme => ({
  container: {
    marginBottom: theme.spacing * 2,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  detailsChild: {
    flex: 0,
    minWidth: '50%',
  },
  pubDate: {
    textAlign: 'right',
  },
}));

class Job extends React.PureComponent {
  openLink = () => {
    Linking.openURL(this.props.url).catch(err => {
      console.error('An error occurred', err);
      Alert.alert('Error', 'An error occurred');
    });
  };

  render() {
    const { title, pubDate, description, website } = this.props;
    return (
      <TouchableOpacity onPress={this.openLink} style={stylesheet.container}>
        <Text>{title}</Text>
        <Text>{description}</Text>
        <View style={stylesheet.detailsContainer}>
          <Text style={stylesheet.detailsChild}>{website}</Text>
          <Text style={[stylesheet.detailsChild, stylesheet.pubDate]}>{pubDate}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Job.propTypes = {
  description: PropTypes.string.isRequired,
  pubDate: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
};

Job.defaultProps = {
  pubDate: new Date().toDateString(),
};

export default Job;
