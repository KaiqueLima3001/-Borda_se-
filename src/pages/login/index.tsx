import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons, FontAwesome, Octicons } from '@expo/vector-icons';
import {
  useNavigation,
  NavigationProp,
  useRoute,
} from '@react-navigation/native';

import { FIRESTORE_DADOS_CADASTRAIS_URL } from '../../config/api';
import { style } from './styles';
import { themes } from '../../global/themes';
import Logo from '../../assets/logo.png';
import { Input } from '../../components/input/index';
import { Button } from '../../components/button/index';

import { useAuth } from '../../context/authContext';

export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const { tipo } = route.params || { tipo: 'pf' };

  const { signIn } = useAuth();

  const [identificador, setIdentificador] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const autenticar = async () => {
    const identificadorDigitado = identificador.trim();
    const senhaDigitada = password.trim();

    if (!identificadorDigitado || !senhaDigitada) {
      return Alert.alert('Atenção', ' Informe os campos obrigatórios!');
    }

    if (
      identificadorDigitado !== '0000' &&
      identificadorDigitado.length !== 11 && // CPF
      identificadorDigitado.length !== 14 // CNPJ
    ) {
      return Alert.alert(
        'Erro',
        'O CPF/CNPJ deve ter 11 (CPF) ou 14 (CNPJ) dígitos.',
      );
    }
    
    setLoading(true);

    try {
      const resposta = await fetch(FIRESTORE_DADOS_CADASTRAIS_URL);
      const dados = await resposta.json();

      if (!dados.documents) {
        Alert.alert('Erro ao buscar usuário', 'Tente novamente mais tarde.');
        setLoading(false); 
        return;
      }

      const usuarios = dados.documents.map(doc => {
        const fields = doc.fields;
        return {
          identificador: fields.identificador?.stringValue || '',
          senha: fields.senha?.stringValue || '',
          nome: fields.nome?.stringValue || 'Usuário',
          role: fields.role?.stringValue || 'user',
          tipoUsuario: fields.tipoUsuario?.stringValue || 'pf', // Pega PF/PJ
        };
      });

      const usuarioValido = usuarios.find(
        u =>
          u.identificador.trim() === identificadorDigitado &&
          u.senha.trim() === senhaDigitada,
      );

      if (usuarioValido) {
        // console.log('Usuário logado:', usuarioValido.identificador);
        signIn(usuarioValido);

      } else {
        // console.log('Usuário inválido');
        Alert.alert('Identificador ou senha inválidos.');
      }
    } catch (erro) {
      // console.error('Erro ao autenticar: ', erro);
      Alert.alert('Erro de conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('Recovery');
  };

  const handleBackToProfileSelection = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.backArrow}
        onPress={handleBackToProfileSelection}>
        <Ionicons
          name="arrow-back"
          size={28}
          color={themes.colors.textPrimary}
        />
      </TouchableOpacity>

      <View style={style.boxTop}>
        <Image source={Logo} style={style.logo} resizeMode="contain" />
      </View>
      <View style={style.boxMid}>
        <Input
          value={identificador}
          onChangeText={setIdentificador}
          title={tipo == 'pj' ? 'CNPJ' : 'CPF'}
          IconRight={FontAwesome}
          iconRightName="id-card-o"
          keyboardType="numeric"
          maxLength={14}
          editable={!loading}
        />
        <Input
          value={password}
          onChangeText={setPassword}
          title="SENHA"
          IconRight={Octicons}
          iconRightName={showPassword ? 'eye-closed' : 'eye'}
          secureTextEntry={showPassword}
          onIconRightPress={() => setShowPassword(!showPassword)}
          editable={!loading}
        />
      </View>

      <View style={style.boxBottom}>
        <Button
          title="ENTRAR"
          loading={loading}
          onPress={autenticar}
          disabled={loading}
        />

        <TouchableOpacity
          style={style.forgotPasswordButton}
          onPress={handleForgotPassword}>
          <Text style={style.forgotPasswordText}>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}

