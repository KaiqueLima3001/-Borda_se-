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

export default function Recovery({ navigation }) {

  const [email, setEmail] = useState('');

  const recoverPassword = () => {
    if (!email) {
      return Alert.alert('Atenção', 'Informe seu email!');
    }

    Alert.alert('Sucesso', 'Email de recuperação enviado!');

    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        style={styles.logo} 
        source={require('../../assets/logo.png')} 
      />

      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.subtitle}>Informe seu email para receber as instruções de recuperação</Text>

      <TextInput 
        placeholder="Seu email" 
        style={styles.textInput} 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor = '#1C1C1C'
      />

      <TouchableOpacity style={styles.btnRecovery} onPress={recoverPassword}>
        <Text style={styles.btnText}>ENVIAR</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('Login')}
      >
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
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  btnRecovery: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
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