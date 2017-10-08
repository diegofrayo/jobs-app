/* eslint quote-props: "off" */

import { StyleSheet } from 'react-native';

export const theme = {
  spacing: 8,
  tabsHeight: 50,
  fontSize: {
    small: 12,
    normal: 14,
    medium: 16,
    large: 20,
  },
  fontWeight: {
    normal: '400',
    semibold: '500',
    bold: '700',
  },
  colors: {
    white: {
      '100': '#AAAAAA',
      '200': '#BBBBBB',
      '300': '#CCCCCC',
      '400': '#DDDDDD',
      '500': '#EEEEEE',
      '600': '#FFFFFF',
      '700': '#999999',
    },
    black: {
      '100': '#111111',
      '200': '#222222',
      '300': '#333333',
      '400': '#444444',
      '500': '#555555',
      '600': '#666666',
      '700': '#777777',
    },
  },
};

export default fn => StyleSheet.create(fn(theme));
