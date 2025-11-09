import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
  ball: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: themes.colors.border,
  },
});