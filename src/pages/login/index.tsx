import React, {useState} from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome, Octicons} from '@expo/vector-icons';
import {useNavigation, NavigationProp, useRoute} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import {style} from './styles';
import Logo from '../../assets/logo.png';
import {themas} from "../../global/themes";
import {Input} from "../../components/input/index";
import {Button} from "../../components/button/index";


export default function Login () {

  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const { tipo } = route.params || { tipo: 'pf' };

  const [cpfcnpj, setCpfCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const FIREBASE_URL = 'https://firestore.googleapis.com/v1/projects/banco-de-dados-4350e/databases/(default)/documents/dadosCadastrais';

  const autenticar = async () => {
    try {
      const resposta = await fetch(FIREBASE_URL);
      const dados = await resposta.json();

      if(!cpfcnpj || !password){
        return Alert.alert('Atenção! Informe os campos obrigatórios.');
      }

      console.log(dados);

      if (!dados.documents) {
        Alert.alert('Erro ao buscar usuários. Tente novamente mais tarde.');
        return;
      }

      const usuarios = dados.documents.map((doc) => {
        const fields = doc.fields;
        return {
          cpf: fields.cpf?.stringValue || '',
          senha: fields.senha?.stringValue || '',
        };
      });

      const usuarioValido = usuarios.find(u =>
        u.cpf.trim() === cpfcnpj.trim() && u.senha.trim() === password.trim()
      );

      if(usuarioValido) {
        navigation.navigate('BottomRoutes');
        Alert.alert('Logado com sucesso')
      }else {
        console.log('Usuário inválido');
        Alert.alert('CPF ou senha inválidos.');
      }
    } catch (erro) {
      console.error('Erro ao autenticar: ', erro);
      Alert.alert('Erro de conexão. Verifique sua internet.');
    }
  }

  // async function getLogin(){
  //   try {
  //     setLoading(true)

  //     if(!cpfcnpj || !password){
  //       return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
  //     }

  //     Alert.alert('Logado com sucesso')

  //   } catch (error) {
  //     console.log(error)
  //   }finally{
  //     setLoading(false)
  //   }
  // }

  return(
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image
          source={Logo}
          style={style.logo}
          resizeMode='contain'
        />
      </View>
      <View style={style.boxMid}>
        <Input 
          value={cpfcnpj}
          onChangeText={setCpfCnpj}
          title={tipo == 'pj' ? "CNPJ" : "CPF"}

          IconRight={FontAwesome}
          iconRightName="id-card-o"
        />
        <Input 
          value={password}
          onChangeText={setPassword}
          title="SENHA"
          IconRight={Octicons}
          iconRightName={showPassword? "eye-closed" : "eye"}
          secureTextEntry={showPassword}
          onIconRightPress = {() => setShowPassword(!showPassword)}
        />
      </View>

      <View style={style.boxBottom}>
        <Button text="ENTRAR" loading={loading} onPress={()=> autenticar()}/>
      </View>
      <Text style={style.textRegister}>Não tem conta? <Text style={{color:themas.colors.textPrimary}}> Crie agora!</Text></Text>
    </View>
  )
}