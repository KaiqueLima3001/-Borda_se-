import { StyleSheet, Platform } from 'react-native';
import { Metrics } from './metrics';
import { themes } from './themes';

export const GlobalStyles = StyleSheet.create({
  /**
   * Contêiner principal de tela.
   * Usa flex: 1 para ocupar a tela inteira.
   * Define a cor de fundo padrão do app.
   */
  screenContainer: {
    flex: 1,
    backgroundColor: themes.colors.background,
  },

  /**
   * Contêiner de conteúdo dentro de uma tela.
   * Adiciona padding horizontal e vertical padrão.
   * Ótimo para envolver o conteúdo de páginas como Login, Register, etc.
   */
  contentContainer: {
    flex: 1,
    paddingHorizontal: Metrics.spacing.md,
    paddingVertical: Metrics.spacing.lg,
  },

  /**
   * Contêiner para centralizar conteúdo na tela.
   * Perfeito para telas de Welcome ou Loading.
   */
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.background,
  },

  /**
   * Título principal (H1)
   */
  title: {
    fontSize: themes.fontSizes.xxl,
    fontWeight: 'bold',
    color: themes.colors.textPrimary,
    marginBottom: Metrics.spacing.md,
  },

  /**
   * Subtítulo (H2)
   */
  subtitle: {
    fontSize: themes.fontSizes.lg,
    color: themes.colors.textSecondary,
    marginBottom: Metrics.spacing.lg,
    textAlign: 'center',
  },

  /**
   * Sombra padronizada para Android e iOS.
   * Use isso em seus componentes de Card, Button, etc.
   */
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: themes.colors.secondary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
        shadowColor: themes.colors.secondary, // A cor é menos impactante no Android
      },
    }),
  },

  /**
   * Sombra mais forte (ex: para Modais)
   */
  shadowStrong: {
    ...Platform.select({
      ios: {
        shadowColor: themes.colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
        shadowColor: themes.colors.secondary,
      },
    }),
  },
});