import { StyleSheet, Platform } from 'react-native';
import { themes } from '../../global/themes';
import { Metrics } from '../../global/metrics';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Metrics.spacing.md,
  },
  label: {
    fontSize: themes.fontSizes.sm,
    color: themes.colors.textPrimary,
    fontFamily: themes.fonts.medium,
    marginBottom: Metrics.spacing.xs,
    marginLeft: Metrics.spacing.sm,
  },
  inputContainer: {
    width: '100%',
    minHeight: Metrics.buttonHeight, 
    flexDirection: 'row',
    alignItems: 'center', 
    backgroundColor: themes.colors.surface,
    borderWidth: 1,
    borderColor: themes.colors.border,
    borderRadius: Metrics.radii.lg, // 12
    paddingHorizontal: Metrics.spacing.sm,
  },
  inputContainerFocused: {
    borderColor: themes.colors.primary, 
  },
  textInput: {
    flex: 1,
    // height: '100%',
    fontSize: themes.fontSizes.md,
    fontFamily: themes.fonts.regular,
    color: themes.colors.textPrimary,
    paddingHorizontal: Metrics.spacing.sm,
    textAlignVertical: 'center',
    paddingTop: Platform.OS === 'ios' ? Metrics.spacing.sm : Metrics.spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? Metrics.spacing.sm : Metrics.spacing.sm,
  },
  iconButton: {
    padding: Metrics.spacing.xs,
  },
});