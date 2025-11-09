import React, { useState, forwardRef, ForwardedRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle, 
} from 'react-native';
import { styles } from './styles';
import { themes } from '../../global/themes';

type Props = TextInputProps & {
  title: string;
  labelStyle?: StyleProp<TextStyle>;
  IconLeft?: React.ElementType;
  iconLeftName?: string;
  onIconLeftPress?: () => void;
  IconRight?: React.ElementType;
  iconRightName?: string;
  onIconRightPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export const Input = forwardRef(
  (
    {
      title,
      labelStyle,
      IconLeft,
      iconLeftName,
      onIconLeftPress,
      IconRight,
      iconRightName,
      onIconRightPress,
      containerStyle, 
      inputStyle,
      onFocus,
      onBlur,
      ...rest
    }: Props,
    ref: ForwardedRef<TextInput>,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: any) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.label, labelStyle]}>{title}</Text>
        <View
          style={[
            styles.inputContainer,
            isFocused && styles.inputContainerFocused,
          ]}>
          {IconLeft && iconLeftName && (
            <TouchableOpacity onPress={onIconLeftPress} style={styles.iconButton}>
              <IconLeft
                name={iconLeftName}
                size={22}
                color={themes.colors.textSecondary}
              />
            </TouchableOpacity>
          )}

          <TextInput
            ref={ref}
            style={[styles.textInput, inputStyle]} 
            placeholderTextColor={themes.colors.textSecondary}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...rest}
          />

          {IconRight && iconRightName && (
            <TouchableOpacity
              onPress={onIconRightPress}
              style={styles.iconButton}>
              <IconRight
                name={iconRightName}
                size={22}
                color={themes.colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);