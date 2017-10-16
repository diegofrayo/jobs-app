// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import { Text, Alert, Linking, TouchableOpacity, View } from 'react-native';

// styles
import createStylesheet from './../styles/createStylesheet';

const stylesheet = createStylesheet(theme => ({
  container: {
    borderBottomColor: theme.color.white[200],
    borderBottomWidth: 1,
    marginBottom: theme.spacing[2],
    paddingBottom: theme.spacing[2],
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  detailsChild: {
    flex: 0,
  },
  title: {
    color: theme.color.black[300],
    fontSize: theme.fontSize.large,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.base,
  },
  description: {
    color: theme.color.black[200],
    fontSize: theme.fontSize.medium,
    marginBottom: theme.spacing.base,
  },
  website: {
    color: theme.color.blue[300],
    fontWeight: theme.fontWeight.semibold,
    minWidth: '65%',
    textDecorationLine: 'underline',
  },
  pubDate: {
    fontStyle: 'italic',
    minWidth: '35%',
    textAlign: 'right',
  },
}));

class Job extends React.PureComponent {
  openLink = () => {
    Linking.openURL(this.props.url).catch(err => {
      Alert.alert(
        'Error',
        'No se pudo abrir el sitio web de esta oferta de trabajo, asegúrate de que tienes un navegador web instalado en tu teléfono.',
      );
      console.error('An error occurred', err);
    });
  };

  render() {
    const { title, pubDate, description, website } = this.props;
    return (
      <TouchableOpacity onPress={this.openLink} style={stylesheet.container}>
        <Text style={stylesheet.title}>{title}</Text>
        <Text style={stylesheet.description}>{description}</Text>
        <View style={stylesheet.detailsContainer}>
          <Text style={[stylesheet.detailsChild, stylesheet.website]}>{website}</Text>
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
