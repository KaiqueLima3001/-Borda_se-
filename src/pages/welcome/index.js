import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
import {themas} from "../../global/themes";

export default function Welcome() {
  const navigation = useNavigation();

  function handlePessoaFisica() {
    navigation.navigate('Login', { tipo: 'pf' });
  }

  function handleEmpresa() {
    navigation.navigate('Login', { tipo: 'pj' });
  }

  function handleRegister() {
    console.log('Navegando para Register...');
    navigation.navigate('Register');
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
          <Text style={styles.rowText}>Sua empresa</Text>
          <Text style={styles.chev}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkWrap} activeOpacity={0.8} onPress={handleRegister}>
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
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 16,
  },
  smallTitle: {
    alignSelf: 'center',
    color: themas.colors.textSecondary,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  title: {
    textAlign: 'center',
    color: themas.colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 32,
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themas.colors.surface,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: themas.colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: themas.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 18,
    color: themas.colors.surface,
  },
  rowText: {
    flex: 1,
    color: themas.colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  chev: {
    color: themas.colors.textSecondary,
    fontSize: 26,
    fontWeight: 'bold',
  },
  linkWrap: {
    marginTop: 24,
    alignItems: 'center',
  },
  link: {
    color: themas.colors.accent,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
});