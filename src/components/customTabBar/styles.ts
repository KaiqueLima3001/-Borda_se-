import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';
import { Metrics } from '../../global/metrics';
import { GlobalStyles } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
  },
  tabArea: {
    flexDirection: 'row',
    backgroundColor: themes.colors.surface,
    ...GlobalStyles.shadow, 
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 0, 
  },
  tabItem: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
  },
  middleButton: {
    width: 70, 
    height: 70,
    borderRadius: 35,
    backgroundColor: themes.colors.primary, 
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1, 
    ...GlobalStyles.shadow, 
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 12,
  },
  middleButtonIconTopLeft: {
    position: 'absolute',
    top: Metrics.spacing.sm, // 8px
    left: Metrics.spacing.sm, // 8px
  },
  middleButtonIconBottomRight: {
    position: 'absolute',
    bottom: Metrics.spacing.sm, // 8px
    right: Metrics.spacing.sm, // 8px
  },
  middleButtonLogo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
    ...GlobalStyles.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 12,
    backgroundColor: themes.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '200%',
    height: '200%',
  },
});