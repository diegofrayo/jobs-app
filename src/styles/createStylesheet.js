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
    white: [1, 2, 3, 4, 5, 6, 7].reduce((acum, current) => {
      // eslint-disable-next-line
      acum[current * 100] = chroma(baseWhite)
        .darken(current * 0.3)
        .hex();
      return acum;
    }, {}),
    black: [1, 2, 3, 4, 5, 6, 7].reduce((acum, current) => {
      // eslint-disable-next-line
      acum[current * 100] = chroma(baseBlack)
        .brighten(current * 0.5)
        .hex();
      return acum;
    }, {}),
  },
};

export default fn => StyleSheet.create(fn(theme));
