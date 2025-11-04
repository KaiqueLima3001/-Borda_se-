import {StyleSheet, Dimensions} from 'react-native';
import {themas} from '../../global/themes'

export const style = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themas.colors.primary
  },
  boxTop:{
    height: Dimensions.get('window').height/3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: themas.colors.secondary
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginTop: 40,
    fontSize:18
  },
  boxMid:{
    height: Dimensions.get('window').height/4,
    width: '100%',
    paddingHorizontal: 37,
  },
  boxBottom:{
    height: Dimensions.get('window').height/3.5,
    width: '100%',
    alignItems: 'center',
    paddingTop: 20, 
  },
  textRegister: {
    fontSize: 16,
    color: themas.colors.textSecondary
  },
  forgotPasswordButton: {
    width: '100%', 
    alignItems: 'center', 
    marginTop: 15, 
    paddingVertical: 10,
  },
  forgotPasswordText: {
    color: themas.colors.accent,
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});