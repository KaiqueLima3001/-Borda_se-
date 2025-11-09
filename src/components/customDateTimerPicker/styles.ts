import { StyleSheet } from 'react-native';

import { themes } from '../../global/themes';
import { Metrics } from '../../global/metrics';
import { GlobalStyles } from '../../global/styles';

export const styles = StyleSheet.create({

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.transparent, 
  },
  container: {
    width: '90%', 
    padding: Metrics.spacing.md, // 16px
    backgroundColor: themes.colors.surface, 
    ...GlobalStyles.shadow, 
    borderRadius: Metrics.radii.lg, // 16px
  },
  buttonContainer: {
    marginTop: Metrics.spacing.md, 
    width: '100%', 
  },
});