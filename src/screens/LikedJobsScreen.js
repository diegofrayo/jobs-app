// npm libs
import React from 'react';
import { View } from 'react-native';

// rn-elements
import { Icon } from 'react-native-elements';

// components
import CustomText from './../components/CustomText';
import FlexContainer from './../components/FlexContainer';

// styles
import createStylesheet, { theme as globalTheme } from './../styles/createStylesheet';

const stylesheet = createStylesheet(theme => ({
  container: {
    display: 'flex',
    flex: 1,
    padding: theme.spacing[2],
    paddingBottom: 0,
  },
}));

class LikedJobsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Favoritos',
    tabBarIcon: () => <Icon name="favorite" color={globalTheme.color.white[600]} />,
  };

  render() {
    return (
      <View style={stylesheet.container}>
        <FlexContainer>
          <CustomText>Ofertas de trabajo favoritas</CustomText>
        </FlexContainer>
      </View>
    );
  }
}

export default LikedJobsScreen;
