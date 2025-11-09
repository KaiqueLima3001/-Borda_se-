import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,  
  TouchableOpacity, 
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { themes } from '../../global/themes';
import { Metrics } from '../../global/metrics';
import { FIREBASE_AUTH_RECOVERY_URL } from '../../config/api';

export default function Recovery({ navigation }) {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const recoverPassword = async () => {
    const emailLimpo = email.trim().toLowerCase();

    if (!emailLimpo) {
      return Alert.alert('Atenção', 'Informe seu email!');
    }

    // Expressão regular simples para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailLimpo)) {
      return Alert.alert('Email Inválido', 'Por favor, digite um email válido.');
    }

    setLoading(true);

    try {
      const body = JSON.stringify({
        requestType: 'PASSWORD_RESET',
        email: emailLimpo,
      });

      const response = await fetch(FIREBASE_AUTH_RECOVERY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error?.message === 'EMAIL_NOT_FOUND') {
          Alert.alert('Erro', 'Nenhum usuário encontrado com este email.');
        } 
      } else {
        Alert.alert(
          'Sucesso',
          'Um email de recuperação foi enviado para ' + emailLimpo,
        );
        navigation.navigate('Login');
      }
    } catch (erro) {
      // console.error('Erro ao recuperar senha: ', erro);
      Alert.alert('Erro de conexão', 'Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        style={styles.logo}
        source={require('../../assets/logo.png')}
      />

      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.subtitle}>
        Informe seu email para receber as instruções de recuperação
      </Text>

      <Input
        title="Email"
        placeholder="Seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <Button
        title="ENVIAR"
        style={styles.btnRecovery}
        onPress={recoverPassword}
        loading={loading}
        disabled={loading}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Login')}
        disabled={loading}>
        <Text style={styles.backText}>Voltar para o login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7C600',
    padding: 20,
  },
  logo: {
    width: 160,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  btnRecovery: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 15,
  },
  backButton: {
    marginTop: 10,
  },
  backText: {
    color: '#000',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});