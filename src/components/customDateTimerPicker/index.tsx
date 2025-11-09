import React from 'react';
import {
  Modal,
  Platform,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import { styles } from './styles';
import { themes } from '../../global/themes';
import { Button } from '../button';

type Props = {
  show: boolean; 
  value: Date;
  mode: 'date' | 'time' | 'datetime'; 
  onClose: () => void; 
  onChange: (date: Date) => void; 
};

export const CustomDateTimePicker = ({
  show,
  value,
  mode,
  onClose,
  onChange,
}: Props) => {
  const internalOnChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    // No Android, o modal nativo sempre fecha, então chamamos onClose
    if (Platform.OS === 'android') {
      onClose();
    }

    if (event.type === 'set' && selectedDate) {
      onChange(selectedDate); 
    }
  };

  // Renderização para o ANDROID 
  // Apenas renderiza o componente se 'show' for true.
  // Ele mesmo gerencia seu próprio modal nativo.
  if (Platform.OS === 'android') {
    return show ? (
      <DateTimePicker
        value={value}
        mode={mode}
        display="default" 
        onChange={internalOnChange}
      />
    ) : null;
  }

  // Renderização para o iOS
  // Renderiza um Modal customizado com o seletor 'inline'.
  return (
    <Modal
      transparent={true}
      visible={show}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose} 
      >
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <DateTimePicker
              value={value}
              mode={mode}
              display="inline"
              onChange={(event, date) => date && onChange(date)}
              textColor={themes.colors.textPrimary}
              accentColor={themes.colors.primary}
            />

            <View style={styles.buttonContainer}>
              <Button title="Confirmar" onPress={onClose} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomDateTimePicker;