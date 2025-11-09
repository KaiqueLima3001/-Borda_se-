import { StyleSheet, Platform } from 'react-native';
import { themes } from '../../global/themes';
import { Metrics } from '../../global/metrics';
import { GlobalStyles } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.background, 
  },
  header: {
    width: '100%',
    paddingHorizontal: Metrics.screenPadding.paddingHorizontal, // 16px
    paddingTop: Platform.OS === 'android' 
      ? Metrics.spacing.xxxl // 57px (Para Android)
      : Metrics.spacing.sm, // 8px (Para iOS)
    paddingBottom: Metrics.spacing.md, // 16px
    backgroundColor: themes.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: themes.colors.border,
    ...GlobalStyles.shadow,
  },
  greeting: {
    fontSize: themes.fontSizes.xl, // 24px
    fontFamily: themes.fonts.regular, 
    color: themes.colors.textPrimary,
  },
  boxInput: {
    width: '100%',
    marginTop: Metrics.spacing.md, // 16px
  },
  boxList: {
    flex: 1,
  },
  list: {
    flex: 1, 
  },
  listContent: {
    paddingHorizontal: Metrics.screenPadding.paddingHorizontal,
    paddingVertical: Metrics.spacing.lg,
    paddingBottom: Metrics.spacing.xxl * 2, 
  },
  card: {
    width: '100%',
    backgroundColor: themes.colors.surface,
    marginBottom: Metrics.spacing.md, // 16px
    borderRadius: Metrics.radii.lg, // 16px 
    padding: Metrics.spacing.md, // 16px
    borderWidth: 1,
    borderColor: themes.colors.border, 
    ...GlobalStyles.shadow, 
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCardLeft: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    gap: Metrics.spacing.md, // 16px
    marginRight: Metrics.spacing.sm, 
  },
  cardTextContainer: {
    flex: 1, 
  },
  titleCard: {
    fontSize: themes.fontSizes.lg, // 18px
    fontFamily: themes.fonts.bold,
    color: themes.colors.textPrimary,
  },
  descriptionCard: {
    fontSize: themes.fontSizes.sm, // 14px
    fontFamily: themes.fonts.regular,
    color: themes.colors.textSecondary,
    flexShrink: 1,
  },
  daysLimited: {
    fontSize: themes.fontSizes.sm, // 14px 
    fontFamily: themes.fonts.regular,
    color: themes.colors.textSecondary, 
    flexShrink: 1,
    marginTop: 2, 
  },
  timeLimitContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 4,
  gap: 4,
  },
  timeLimitText: {
    fontSize: themes.fontSizes.sm,
    fontFamily: themes.fonts.medium,
    color: themes.colors.error,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.spacing.xl,
    gap: Metrics.spacing.md,
  },
  centeredText: {
    fontSize: themes.fontSizes.md,
    color: themes.colors.textSecondary,
    fontFamily: themes.fonts.medium,
    textAlign: 'center',
  },
});