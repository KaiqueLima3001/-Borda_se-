import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './styles';

type Props = {
  caption: string;
  color: string;
};

export function Flag({ caption, color }: Props) {
  return (
    <View
     style={[styles.container, { backgroundColor: color }]}
    >
      <Text style={styles.text}>{caption}</Text>
    </View>
  );
}