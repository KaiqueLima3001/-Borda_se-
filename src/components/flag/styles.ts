import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';
import { Metrics } from '../../global/metrics';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: Metrics.spacing.xs, // 4px
    paddingHorizontal: Metrics.spacing.sm, // 8px
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.radii.sm, // 4px 
  },
  text: {
    fontFamily: themes.fonts.regular,
    fontSize: themes.fontSizes.sm, // 14px 
    color: themes.colors.buttonText, 
  },
});