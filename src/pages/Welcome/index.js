import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';

import {Button} from '../../components/button/index';
import themas from '../../global/themes';

export default function Welcome () {

  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <View style={style.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require('../../assets/logo.png')}
          style={{width: "100%"}}
          resizeMode= "contain"
        />
      </View>

      <View style={style.containerWelcome}>
        <Text style={style.titleWelcome}>Peça, acompanhe e receba seus bordados em um só lugar!</Text>
        <Text style={style.textWelcome}>Faça o login para começar</Text>

        <TouchableOpacity style={style.button} onPress={()=>navigation.navigate('Login')} >
          <Text style={style.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F5C518'
  },
  containerLogo: {
    flex: 2,
    backgroundColor: '#F5C518',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerWelcome: {
    flex:1,
    backgroundColor:'#FDFBF6',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  titleWelcome: {
    fontSize: 24,
    fontWeight: 'bolt',
    marginTop: 28,
    marginBottom: 12,
  },
  textWelcome: {
    color: '#a1a1a1'
  },
  button: {
    position: 'absolute',
    backgroundColor: '#F5C518',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  }
})

