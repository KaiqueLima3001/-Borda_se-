import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { styles } from './styles';
import { themes } from '../../global/themes';

type Props = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
  /**
   * Define o estilo do botão.
   * 'primary' (padrão): Fundo sólido.
   * 'outline': Transparente com borda.
   */
  variant?: 'primary' | 'outline';
};

export function Button({
  title,
  loading = false,
  variant = 'primary',
  style, 
  ...rest
}: Props) {
  const containerStyle: ViewStyle[] = [
    styles.container,
    variant === 'outline' ? styles.containerOutline : styles.containerPrimary,
  ];

  const textStyle: TextStyle[] = [
    styles.text,
    variant === 'outline' ? styles.textOutline : styles.textPrimary,
  ];

  if (style) {
    containerStyle.push(style as ViewStyle);
  }

  return (
    <TouchableOpacity
      style={containerStyle}
      {...rest}
      activeOpacity={0.7} 
      disabled={loading || rest.disabled}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'outline'
              ? themes.colors.buttonPrimary
              : themes.colors.buttonText
          }
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}