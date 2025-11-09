import React from 'react';
import { View, TouchableOpacity,Image } from 'react-native';
import {
  MaterialIcons,
  FontAwesome,
  AntDesign,
  Entypo,
} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './styles';
import { themes } from '../../global/themes';
import { Metrics } from '../../global/metrics';

import { useList } from '../../context/listContext';
import { useAuth } from '../../context/authContext'; 
import Logo from '../../assets/logo.png'; 

export default ({ state, navigation }) => {
  const { bottom: bottomInset } = useSafeAreaInsets();

  const { onOpen } = useList();
  const { user } = useAuth();

  const go = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const iconSize = themes.fontSizes.xl; // 24

  return (
    <View style={styles.container}>
      {user?.role === 'admin' ? (
        <TouchableOpacity
          style={[
            styles.middleButton,
            { bottom: bottomInset + Metrics.spacing.md },
          ]}
          onPress={() => onOpen()}
        >
        <View style={styles.middleButtonIconTopLeft}>
          <Entypo name="plus" size={36} color={themes.colors.surface} />
        </View>

        <View style={styles.middleButtonIconBottomRight}>
          <MaterialIcons name="edit" size={28} color={themes.colors.surface} />
        </View>
      </TouchableOpacity>
        
      ) : (
        <View
          style={[
            styles.middleButtonLogo, 
            { bottom: bottomInset + Metrics.spacing.md },
          ]}>
          <Image
            source={Logo}
            style={styles.logoImage} 
            resizeMode="contain"
          />
        </View>
      )}

      <View
        style={[
          styles.tabArea,
          {
            height: Metrics.buttonHeight + bottomInset,
            paddingBottom: bottomInset,
          },
        ]}>

        <TouchableOpacity style={styles.tabItem} onPress={() => go('List')}>
          <AntDesign
            name="bars"
            size={iconSize}
            color={
              state.index === 0
                ? themes.colors.primary 
                : themes.colors.textSecondary
            }
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => go('User')}>
          <FontAwesome
            name="user"
            size={iconSize}
            color={
              state.index === 1
                ? themes.colors.primary 
                : themes.colors.textSecondary 
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};