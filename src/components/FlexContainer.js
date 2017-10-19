// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

class FlexContainer extends React.PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;
    return (
      <View
        style={{
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        {children && children.length ? React.Children.map(children, child => child) : children}
      </View>
    );
  }
}

export default FlexContainer;
