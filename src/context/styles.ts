import { StyleSheet, Platform } from 'react-native';
import { themes } from '../global/themes';
import { Metrics } from '../global/metrics';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: Metrics.spacing.md, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.spacing.lg,
    paddingVertical: Metrics.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: themes.colors.border,
  },
  title: {
    fontSize: themes.fontSizes.lg, // 18px
    fontFamily: themes.fonts.bold,
    color: themes.colors.textPrimary,
  },
  iconSize: {
    width: 32, 
    height: 32,
  },
  scrollContainer: {
    paddingHorizontal: Metrics.spacing.lg, // 24px
    paddingTop: Metrics.spacing.sm, // 8px
    paddingBottom: Metrics.spacing.xxl * 2, // 80px
  },
  label: {
    fontSize: themes.fontSizes.sm, // 14px
    fontFamily: themes.fonts.medium,
    color: themes.colors.textPrimary,
    marginBottom: Metrics.spacing.xs,
    marginLeft: Metrics.spacing.sm,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top', 
    paddingTop: Metrics.spacing.sm,
    height: 'auto',
  },
  containerFlag: {
    width: '100%',
    marginTop: Metrics.spacing.md, // 16px
  },
  rowFlags: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite quebra de linha
    gap: Metrics.spacing.sm, // 8px de espaço
    marginTop: Metrics.spacing.sm,
  },
  flagButton: {
    opacity: 0.6, 
    padding: 2, 
    borderRadius: Metrics.radii.md, // 8px
  },
  flagSelected: {
    opacity: 1.0,
    borderWidth: 2,
    borderColor: themes.colors.primary, 
  },
});