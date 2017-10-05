import { StyleSheet } from 'react-native';

export const theme = {
  spacing: 8,
  tabsHeight: 50,
  colors: {},
};

export default fn => StyleSheet.create(fn(theme));
