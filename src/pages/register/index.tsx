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
  SafeAreaView
} from 'react-native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { themes } from '../../global/themes';
import { FIRESTORE_DADOS_CADASTRAIS_URL, FIREBASE_AUTH_SIGN_UP_URL,} from '../../config/api';
import { useAuth, User } from '../../context/authContext';

import { Input } from '../../components/input';
import { Button } from '../../components/button';

export default function Register({ navigation }) {
  const insets = useSafeAreaInsets();
  
  const { signIn } = useAuth();

  const [nome, setNome] = useState('');
  const [identificador, setIdentificador] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [loading, setLoading] = useState(false);

  const cadastro = async () => {
    if (!nome || !identificador || !email || !senha || !confirmarSenha) {
      return Alert.alert('Atenção', 'Preencha todos os campos!');
    }

    const identificadorLimpo = identificador.trim();
    if (
      identificadorLimpo.length !== 11 && // CPF
      identificadorLimpo.length !== 14 // CNPJ
    ) {
      return Alert.alert(
        'Erro',
        'O campo CPF/CNPJ deve ter 11 (CPF) ou 14 (CNPJ) dígitos.',
      );
    }

    if (senha !== confirmarSenha) {
      return Alert.alert('Atenção', 'As senhas não coincidem!');
    }
    if (senha.length < 6) {
      return Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres!');
    }
    if (loading) return;

    setLoading(true);

    // CRIANDO O OBJETO DO NOVO USUÁRIO
    // Precisamos dele para fazer um signIn automático quando for bem sucedido o register
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();
    const senhaLimpa = senha.trim();
    const tipoUsuario = identificadorLimpo.length > 11 ? 'pj' : 'pf';

    try {
      const authBody = JSON.stringify({
        email: emailLimpo,
        password: senhaLimpa,
        returnSecureToken: true,
      });

      const authResponse = await fetch(FIREBASE_AUTH_SIGN_UP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: authBody,
      });

      const authData = await authResponse.json();

      // Se a API de Auth falhar (ex: EMAIL_EXISTS)
      if (!authResponse.ok) {
        if (authData.error?.message === 'EMAIL_EXISTS') {
          throw new Error('Este email já está cadastrado.');
        }
        throw new Error(authData.error?.message || 'Erro ao criar usuário na autenticação.');
      }

      const novoUsuario: User = {
        identificador: identificadorLimpo,
        nome: nomeLimpo,
        email: emailLimpo,
        role: 'user',
        tipoUsuario: tipoUsuario,
      };

      const firestoreBody = {
        fields: {
          identificador: { stringValue: novoUsuario.identificador },
          nome: { stringValue: novoUsuario.nome },
          email: { stringValue: novoUsuario.email },
          senha: { stringValue: senhaLimpa }, 
          role: { stringValue: novoUsuario.role },
          tipoUsuario: { stringValue: novoUsuario.tipoUsuario },
        },
      };

      const firestoreResponse = await fetch(FIRESTORE_DADOS_CADASTRAIS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(firestoreBody),
      });

      if (!firestoreResponse.ok) {
        throw new Error('Falha ao salvar os dados do usuário no banco de dados.');
      }


      await signIn(novoUsuario);

    } catch (erro) {
      console.error('Erro ao cadastrar: ', erro);
      Alert.alert('Erro no Cadastro', erro.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToProfileSelection = () => {
    navigation.navigate('Welcome');
  };

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: themes.colors.primary }}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: insets.top + 10,
            paddingBottom: insets.bottom + 40,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={[
            styles.backArrow,
            { top: insets.top + (Platform.OS === 'ios' ? 5 : 20) },
          ]}
          onPress={handleBackToProfileSelection}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>

        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}
          resizeMode="contain"
        />

        <Text style={styles.title}>Criar Conta</Text>

        <Input
          title="Nome completo"
          placeholder="Digite seu nome..."
          value={nome}
          onChangeText={setNome}
          editable={!loading}
        />

        <Input
          title="CNPJ/CPF"
          placeholder="Digite seu CPF ou CNPJ..."
          value={identificador}
          onChangeText={setIdentificador}
          keyboardType="numeric"
          maxLength={14}
          editable={!loading}
        />

        <Input
          title="Email"
          placeholder="Email da sua conta"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        <Input
          title="Senha"
          secureTextEntry={showPassword}
          placeholder="Nova Senha (mín. 6 caracteres)"
          value={senha}
          onChangeText={setSenha}
          editable={!loading}
          IconRight={Octicons}
          iconRightName={showPassword ? 'eye-closed' : 'eye'}
          onIconRightPress={() => setShowPassword(!showPassword)}
        />

        <Input
          title="Confirmar Senha"
          secureTextEntry={showConfirmPassword}
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          editable={!loading}
          IconRight={Octicons}
          iconRightName={showConfirmPassword ? 'eye-closed' : 'eye'}
          onIconRightPress={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
        />

        <Button
          title="Cadastrar"
          style={styles.btnCadastro}
          onPress={cadastro}
          loading={loading}
          disabled={loading}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.navigate('Login')}
          disabled={loading}
        >
          <Text style={styles.backText}>Já tem conta? Fazer login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: themes.colors.primary,
    padding: 20,
  },
  backArrow: {
    position: 'absolute',
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  logo: {
    width: 160,
    height: 150,
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },
  btnCadastro: {
    width: '100%',
    marginTop: 20,
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