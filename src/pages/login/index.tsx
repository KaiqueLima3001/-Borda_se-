import React, {useState} from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome, Octicons} from '@expo/vector-icons';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import {style} from './styles';
import Logo from '../../assets/logo.png';
import {themas} from "../../global/themes";
import {Input} from "../../components/input/index";
import {Button} from "../../components/button/index";


export default function Login () {

  const navigation = useNavigation<NavigationProp<any>>();

  const [cpfcnpj, setCpfCnpj] = useState('a');
  const [password, setPassword] = useState('a');
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  async function getLogin(){
    try {
      setLoading(true)

      if(!cpfcnpj || !password){
        return Alert.alert('Atenção', 'Informe os campos obrigatórios!')
      }

      navigation.reset({routes:[{name:"BottomRoutes"}]})

      Alert.alert('Logado com sucesso')

    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  return(
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image
          source={Logo}
          style={style.logo}
          resizeMode='contain'
        />
        <Text style={style.title}>Bem vindo de voltar!</Text>
      </View>

      <View style={style.boxMid}>
        <Input 
          value={cpfcnpj}
          onChangeText={setCpfCnpj}
          title="CPF/CNPJ"

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
        <Button text="ENTRAR" loading={loading} onPress={()=> getLogin()}/>
      </View>
      <Text style={style.textRegister}>Não tem conta? <Text style={{color:themas.colors.textPrimary}}> Crie agora!</Text></Text>
    </View>
  )
}