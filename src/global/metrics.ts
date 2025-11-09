import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const spacing = {
  xs: 4, // extra-small
  sm: 8, // small
  md: 16, // medium
  lg: 24, // large
  xl: 32, // extra-large
  xxl: 40, // extra-extra-large
  xxxl: 56, // extra-extra-large
};

const radii = {
  sm: 4, // Pequeno
  md: 8, // Médio
  lg: 16, // Grande
  pill: 999, // Arredondamento completo (para botões "pill")
};

export const Metrics = {
  screenWidth: width,
  screenHeight: height,
  isSmallDevice: width < 375,

  spacing,
  radii,

  screenPadding: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },

  statusBarHeight: Platform.OS === 'ios' ? 20 : 0, 

  buttonHeight: 50,
  inputHeight: 48,
};