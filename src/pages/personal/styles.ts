import { StyleSheet, Platform } from 'react-native';
import { themes } from '../../global/themes';
import { Metrics } from '../../global/metrics';
import { GlobalStyles } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.background, 
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.spacing.sm, // 8px
    paddingVertical: Platform.OS === 'ios' ? Metrics.spacing.sm : Metrics.spacing.md,
    backgroundColor: themes.colors.surface, 
    borderBottomWidth: 1,
    borderBottomColor: themes.colors.border,
    ...GlobalStyles.shadow,
  },
  backButton: {
    padding: Metrics.spacing.sm, 
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: themes.fontSizes.lg, // 18px
    fontFamily: themes.fonts.bold,
    color: themes.colors.textPrimary,
    marginRight: Metrics.spacing.xl + Metrics.spacing.sm, 
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Metrics.spacing.xl, 
  },
  formContainer: {
    padding: Metrics.spacing.lg, // 24px
  },
  description: {
    fontSize: themes.fontSizes.md, // 16px
    color: themes.colors.textSecondary,
    textAlign: 'center',
    marginBottom: Metrics.spacing.xl, // 32px
    lineHeight: 22,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: Metrics.spacing.xl, // 32px
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.spacing.sm, // 8px
    ...GlobalStyles.shadowStrong,
  },
  avatarText: {
    fontSize: 42,
    fontFamily: themes.fonts.bold,
    color: themes.colors.textPrimary,
  },
  photoText: {
    fontSize: themes.fontSizes.sm, // 14px
    color: themes.colors.textSecondary,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: Metrics.spacing.md, // 16px
  },
  inputLabel: {
    fontSize: themes.fontSizes.sm, // 14px
    fontFamily: themes.fonts.medium,
    color: themes.colors.textPrimary,
    marginBottom: Metrics.spacing.xs, // 4px
    marginLeft: Metrics.spacing.sm, // 8px
  },
  buttonContainer: {
    marginTop: Metrics.spacing.lg, // 24px
  },
  inputTextDisabled: {
    color: themes.colors.textSecondary,
  },
  deleteAccountButton: {
    marginTop: Metrics.spacing.xl, // 32px
    paddingVertical: Metrics.spacing.sm,
  },
  deleteAccountText: {
    color: themes.colors.error, 
    fontFamily: themes.fonts.medium,
    fontSize: themes.fontSizes.md, // 16px
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  genderContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: Metrics.spacing.sm,
  marginBottom: Metrics.spacing.md,
  },
  genderButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Metrics.spacing.sm,
    marginHorizontal: Metrics.spacing.xs,
    borderWidth: 1,
    borderColor: themes.colors.border,
    borderRadius: Metrics.radii.lg,
    backgroundColor: themes.colors.surface,
  },

  genderButtonSelected: {
    backgroundColor: themes.colors.primary,
    borderColor: themes.colors.primary,
  },

  genderText: {
    color: themes.colors.textSecondary,
    fontFamily: themes.fonts.medium,
  },

  genderTextSelected: {
    color: themes.colors.buttonText,
  },
});