import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';
import { Metrics } from '../../global/metrics';
import { GlobalStyles } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Metrics.buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.radii.pill, 
  },
  text: {
    fontSize: themes.fontSizes.md, 
    fontWeight: 'bold', 
  },

  containerPrimary: {
    backgroundColor: themes.colors.buttonPrimary,
    ...GlobalStyles.shadow, 
  },
  textPrimary: {
    color: themes.colors.buttonText,
  },

  containerOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: themes.colors.buttonPrimary,
  },
  textOutline: {
    color: themes.colors.buttonPrimary,
  },
});