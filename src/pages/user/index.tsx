import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator, 
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './styles';
import { useAuth } from '../../context/authContext';
import { themes } from '../../global/themes';

export default function User() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // PEGAR O USUÁRIO REAL E O 'signOut'
  const { user, signOut } = useAuth();

  // Função para pegar as iniciais
  const getInitials = (name: string | undefined) => {
    if (!name) return '??';

    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    } else {
      return (
        names[0].charAt(0) + names[names.length - 1].charAt(0)
      ).toUpperCase();
    }
  };

  const menuItems = [
    {
      id: 1,
      title: 'Dados pessoais',
      icon: 'person-outline',
      onPress: () => {
        navigation.navigate('PersonalDataScreen') 
      },
    },
    {
      id: 2,
      title: 'Alterar Senha',
      icon: 'lock-closed-outline',
      onPress: () => {
        navigation.navigate('ChangePasswordScreen')
      },
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Confirmar Saída', 
      'Você tem certeza que deseja sair da sua conta?', 
      [
        {
          text: 'Cancelar',
          style: 'cancel', 
        },
        {
          text: 'Sair',
          style: 'destructive', 
          onPress: () => signOut(),
        },
      ],
    );
  };

  // Se o 'user' ainda não carregou, mostre um loading.
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={themes.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // Se o 'user' já carregou, renderiza a tela normal
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top + 10 },]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarInitials}>
              <Text style={styles.initialsText}>
                {getInitials(user.nome)}
              </Text>
            </View>
          </View>
          <Text style={styles.userName}>{user.nome}</Text>
          <Text style={styles.userEmail}>{user.role}</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}>
              <View style={styles.menuItemLeft}>
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={themes.colors.textSecondary}
                />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={themes.colors.accent}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={themes.colors.error} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>

        <View style={styles.copyrightContainer}>
          <Text style={styles.copyrightText}>
            Copyright 2026 © IBORDA-SE - Desenvolvido por Aurores
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}