import React from 'react';
import { View } from 'react-native';
import { styles } from './styles'; 

type Props = {
  color: string;
};

export function Ball({ color }: Props) {
  return (
    // Aplica o estilo base e, em seguida, o objeto com a cor (que sobrepõe a cor padrão)
    <View style={[styles.ball, { borderColor: color }]} />
  );
}