import { StyleSheet } from 'react-native';

const theme = {};

export default fn => StyleSheet.create(fn(theme));
