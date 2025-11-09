import { StyleSheet } from 'react-native';
// 1. IMPORTAR NOSSOS TOKENS GLOBAIS
import { themes } from '../../global/themes';
import { Metrics } from '../../global/metrics';
import { GlobalStyles } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.background, 
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingVertical: Metrics.spacing.xxl, 
    backgroundColor: themes.colors.surface, 
    borderBottomWidth: 1,
    borderBottomColor: themes.colors.border, 
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Metrics.spacing.md, // 16px
  },
  avatarInitials: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: themes.colors.primary, 
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: themes.colors.surface, 
    ...GlobalStyles.shadow, 
  },
  initialsText: {
    fontSize: themes.fontSizes.xxl, // 36px
    fontFamily: themes.fonts.bold,
    color: themes.colors.secondary, 
  },
  userName: {
    fontSize: themes.fontSizes.xl, // 24px
    fontFamily: themes.fonts.bold,
    color: themes.colors.textPrimary,
    marginBottom: Metrics.spacing.xs, // 4px
  },
  userEmail: {
    fontSize: themes.fontSizes.md, // 16px
    color: themes.colors.textSecondary, 
    fontFamily: themes.fonts.regular,
  },
  menuContainer: {
    backgroundColor: themes.colors.surface, 
    marginTop: Metrics.spacing.lg, // 20px
    marginHorizontal: Metrics.spacing.md, // 16px
    borderRadius: Metrics.radii.lg, // 12px
    ...GlobalStyles.shadow, 
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Metrics.spacing.md, // 16px
    paddingHorizontal: Metrics.spacing.lg, // 20px 
    borderBottomWidth: 1,
    borderBottomColor: themes.colors.border, 
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: themes.fontSizes.md, // 16px
    color: themes.colors.textPrimary,
    marginLeft: Metrics.spacing.md, // 12px
    fontFamily: themes.fonts.medium,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.colors.surface, 
    marginHorizontal: Metrics.spacing.md, // 16px
    marginTop: Metrics.spacing.lg, // 20px
    marginBottom: Metrics.spacing.xl, // 40px
    paddingVertical: Metrics.spacing.md, // 16px
    borderRadius: Metrics.radii.lg, // 12px
    borderWidth: 1,
    borderColor: themes.colors.error, 
    ...GlobalStyles.shadow, 
  },
  logoutText: {
    fontSize: themes.fontSizes.md, // 16px
    color: themes.colors.error, 
    fontFamily: themes.fonts.bold,
    marginLeft: Metrics.spacing.sm, // 8px
  },
  copyrightContainer: {
    alignItems: 'center',
    marginTop: Metrics.spacing.xl, // 40px
    marginBottom: Metrics.spacing.lg, // 20px
    paddingHorizontal: Metrics.spacing.lg, // 20px
  },
  copyrightText: {
    fontSize: themes.fontSizes.xs, // 12px
    color: themes.colors.textSecondary, 
    textAlign: 'center',
    lineHeight: 16,
  },
});