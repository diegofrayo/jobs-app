// npm libs
import React from 'react';
import { View } from 'react-native';
import { WebBrowser } from 'expo';

// rn-elements
import { Icon } from 'react-native-elements';

// components
import CustomText from './../components/CustomText';
import FlexContainer from './../components/FlexContainer';

// constants
import constants from './../constants';

// styles
import createStylesheet, { theme as globalTheme } from './../styles/createStylesheet';

const stylesheet = createStylesheet(theme => ({
  container: {
    display: 'flex',
    flex: 1,
    padding: theme.spacing[2],
    paddingBottom: 0,
  },
  developedBy: {
    fontSize: theme.fontSize.large,
    marginBottom: theme.spacing.base,
    marginTop: theme.spacing.base,
  },
  heydev: {
    color: theme.color.blue[100],
    fontSize: theme.fontSize.xlarge,
    textDecorationLine: 'underline',
  },
}));

class InfoScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Info',
    tabBarIcon: () => <Icon name="info" color={globalTheme.color.white[600]} />,
  };

  openLink = () => {
    WebBrowser.openBrowserAsync('https://heydev.now.sh/');
  };

  render() {
    return (
      <View style={stylesheet.container}>
        <FlexContainer>
          {/*
            <CustomText>ENV: {__DEV__ ? 'Development' : 'Production'}</CustomText>
            <CustomText>HOST: {constants.BACKEND_URL}</CustomText>
          */}
          <FlexContainer>
            <Icon name="code" color={globalTheme.color.black[400]} size={150} />
            <CustomText style={stylesheet.developedBy}>Desarrollado por</CustomText>
            <CustomText bold onPress={this.openLink} style={stylesheet.heydev}>
              Hey Dev!
            </CustomText>
          </FlexContainer>
        </FlexContainer>
      </View>
    );
  }
}

export default InfoScreen;
