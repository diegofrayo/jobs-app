// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

// styles
import createStylesheet, { theme as globalTheme } from './../styles/createStylesheet';

class CustomText extends React.PureComponent {
  static propTypes = {
    bold: PropTypes.bool,
    children: PropTypes.any.isRequired, // eslint-disable-line
    onPress: PropTypes.func,
    style: PropTypes.any, // eslint-disable-line
  };

  static defaultProps = {
    bold: false,
    onPress: undefined,
    style: {},
  };

  stylesheet = {
    text: {
      color: globalTheme.color.black[400],
      fontFamily: 'open-sans',
      fontSize: globalTheme.fontSize.normal,
    },
  };

  render() {
    const { bold, children, onPress, style } = this.props;
    if (bold) this.stylesheet.text.fontFamily = 'open-sans-bold';
    return (
      <Text
        style={[createStylesheet(() => this.stylesheet).text, style]}
        onPress={onPress}
      >
        {children}
      </Text>
    );
  }
}

export default CustomText;
