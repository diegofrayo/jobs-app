/* eslint quote-props: "off" */

import { StyleSheet } from 'react-native';
import chroma from 'chroma-js';

const baseWhite = '#FFFFFF';
const baseBlack = '#000000';

export const theme = {
  spacing: 8,
  tabsHeight: 50,
  fontSize: {
    small: 14,
    normal: 16,
    medium: 18,
    large: 20,
  },
  fontWeight: {
    normal: '400',
    semibold: '500',
    bold: '700',
  },
  colors: {
    white: {
      100: chroma(baseWhite).darken(0.5).hex(),
      200: chroma(baseWhite).darken(1).hex(),
      300: chroma(baseWhite).darken(1.5).hex(),
      400: chroma(baseWhite).darken(2).hex(),
      500: chroma(baseWhite).darken(2.5).hex(),
      600: chroma(baseWhite).darken(3).hex(),
      700: chroma(baseWhite).darken(3.5).hex(),
    },
    black: {
      100: chroma(baseBlack).darken(0.5).hex(),
      200: chroma(baseBlack).darken(1).hex(),
      300: chroma(baseBlack).darken(1.5).hex(),
      400: chroma(baseBlack).darken(2).hex(),
      500: chroma(baseBlack).darken(2.5).hex(),
      600: chroma(baseBlack).darken(3).hex(),
      700: chroma(baseBlack).darken(3.5).hex(),
    },
  },
};

export default fn => StyleSheet.create(fn(theme));
