import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themas } from "../../global/themes";

export default function Register({ navigation }) {

  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const cadastro = () => {
    if (!nome || !cnpj || !email || !senha || !confirmarSenha) {
      return Alert.alert('Atenção', 'Preencha todos os campos!');
    }

    if (senha !== confirmarSenha) {
      return Alert.alert('Atenção', 'As senhas não coincidem!');
    }

    if (senha.length < 6) {
      return Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres!');
    }

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');

    if (navigation) {
      navigation.navigate('Login');
    }
  };

  const handleBackToProfileSelection = () => {
    navigation.navigate('welcome'); 
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity 
          style={styles.backArrow}
          onPress={handleBackToProfileSelection}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      <Image 
        style={styles.logo} 
        source={require('../../assets/logo.png')} 
      />

      <Text style={styles.title}>Criar Conta</Text>

      <TextInput 
        placeholder="Nome completo" 
        style={styles.textInput} 
        value={nome}
        onChangeText={setNome}
        placeholderTextColor = '#1C1C1C'
      />

      <TextInput 
        placeholder="CNPJ/CPF" 
        style={styles.textInput} 
        value={cnpj}
        onChangeText={setCnpj}
        keyboardType="numeric"
        placeholderTextColor = '#1C1C1C'
      />
      <TextInput 
        placeholder="Email da sua conta" 
        style={styles.textInput} 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor = '#1C1C1C'
      />

      <TextInput 
        secureTextEntry={true} 
        placeholder="Nova Senha" 
        style={styles.textInput} 
        value={senha}
        onChangeText={setSenha}
        placeholderTextColor = '#1C1C1C'
      />

      <TextInput 
        secureTextEntry={true} 
        placeholder="Confirmar senha" 
        style={styles.textInput} 
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        placeholderTextColor = '#1C1C1C'
      />

      <TouchableOpacity style={styles.btnCadastro} onPress={cadastro}>
        <Text style={styles.btnText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation?.navigate('Login')}
      >
        <Text style={styles.backText}>Já tem conta? Fazer login</Text>
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
  backArrow: {
    position: 'absolute',
    top: 50,
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
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    placeholderTextColor: '#1C1C1C'
  },
  btnCadastro: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
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