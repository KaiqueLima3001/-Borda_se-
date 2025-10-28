import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

import Logo from '../../assets/logo.png';
import {themas} from "../../global/themes";

export default function ProfileSelectionScreen() {
  const navigation = useNavigation();

  function handlePessoaFisica() {
    navigation.navigate('Login', { tipo: 'pf' });
  }

  function handleEmpresa() {
    navigation.navigate('Login', { tipo: 'pj' });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.sheet}>
        <Text style={styles.smallTitle}>Já é cliente?</Text>
        <Text style={styles.title}>Escolha seu perfil</Text>

        <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={handlePessoaFisica}>
          <View style={styles.iconCircle}><Text style={styles.icon}>👤</Text></View>
          <Text style={styles.rowText}>Pessoa Física</Text>
          <Text style={styles.chev}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={handleEmpresa}>
          <View style={styles.iconCircle}><Text style={styles.icon}>💼</Text></View>
          <Text style={styles.rowText}>Pessoa Jurídica</Text>
          <Text style={styles.chev}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkWrap} activeOpacity={0.8}>
          <Text style={styles.link}>Ainda não sou cliente</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themas.colors.primary,
  },
  header: {
    height: height * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themas.colors.primary,
  },
  image: {
    width: width * 0.7,
    height: '100%',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: themas.colors.background, 
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  smallTitle: {
    alignSelf: 'center',
    color: themas.colors.textSecondary,
    marginBottom: 6,
    fontSize: 18,
  },
  title: {
    textAlign: 'center',
    color: themas.colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themas.colors.border,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginVertical: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: themas.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
    color: themas.colors.surface,
  },
  rowText: {
    flex: 1,
    color: themas.colors.surface,
    fontSize: 18,
    fontWeight: '600',
  },
  chev: {
    color: themas.colors.surface,
    fontSize: 24,
  },
  linkWrap: {
    marginTop: 18,
    alignItems: 'center',
  },
  link: {
    color: themas.colors.primary,
    fontSize: 18,
    fontWeight: '700',
  },
});