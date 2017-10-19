// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import { Share, TouchableOpacity, View } from 'react-native';
import { WebBrowser } from 'expo';

// components
import CustomText from './CustomText';

// styles
import createStylesheet from './../styles/createStylesheet';

const stylesheet = createStylesheet(theme => ({
  container: {
    paddingBottom: theme.spacing[2],
    paddingTop: theme.spacing.base,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  detailsChild: {
    flex: 0,
  },
  title: {
    color: theme.color.black[500],
    fontSize: theme.fontSize.large,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.base,
  },
  description: {
    color: theme.color.black[700],
    fontSize: theme.fontSize.medium,
    marginBottom: theme.spacing.base,
  },
  website: {
    color: theme.color.blue[300],
    minWidth: '65%',
    textDecorationLine: 'underline',
  },
  pubDate: {
    fontSize: theme.fontSize.small,
    minWidth: '35%',
    paddingRight: theme.spacing.base,
    textAlign: 'right',
  },
}));

class Job extends React.PureComponent {
  static propTypes = {
    description: PropTypes.string.isRequired,
    pubDate: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
  };

  static defaultProps = {
    pubDate: new Date().toDateString(),
  };

  static keyExtractor = (item, index) => `job-item-${index}`;

  openLink = () => {
    // Open a default browser
    /*
    import { Alert, Linking } from 'react-native';
    Linking.openURL(this.props.url).catch(err => {
      Alert.alert(
        'Error',
        'No se pudo abrir el sitio web de esta oferta de trabajo, asegúrate de que tienes un navegador web instalado en tu teléfono.',
      );
      console.error('An error occurred', err);
    });
    */

    WebBrowser.openBrowserAsync(this.props.url);
  };

  openMenu = () => {
    Share.share(
      {
        title: 'Comparte esta oferta de trabajo',
        message: `Hola, te invito a que revises esta oferta de trabajo abriendo el siguiente enlace ${this
          .props.url}`,
        url: this.props.url,
      },
      {
        dialogTitle: 'Comparte esta oferta de trabajo',
      },
    ).then(response => {
      console.log(response);
    });
  };

  render() {
    const { title, pubDate, description, website } = this.props;
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          onLongPress={this.openMenu}
          onPress={this.openLink}
          style={stylesheet.container}
        >
          <CustomText bold style={stylesheet.title}>{title}</CustomText>
          <CustomText style={stylesheet.description}>{description}</CustomText>
          <View style={stylesheet.detailsContainer}>
            <CustomText style={[stylesheet.detailsChild, stylesheet.website]} bold>
              {website}
            </CustomText>
            <CustomText style={[stylesheet.detailsChild, stylesheet.pubDate]}>
              {pubDate}
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Job;
