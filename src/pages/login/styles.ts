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
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    color: themas.colors.secondary
  },
  logo: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red'
  },

  title: {
    fontWeight: 'bold',
    marginTop: 40,
    fontSize:18
  },
  
  boxMid:{
    height: Dimensions.get('window').height/4,
    width: '100%',
    // backgroundColor: 'green',
    paddingHorizontal: 37,
  },
  /*
  titleInput: {
    marginLeft: 5,
    color: themas.colors.secondary,
    marginTop: 20,
  },
  boxInput: {
    width: '100%',
    height: 40,
    borderWidth:1,
    borderRadius: 40,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:5,
    backgroundColor: themas.colors.surface,
    borderColor: themas.colors.border,
    // color: themas.colors.textPrimary,
    // placeholderTextColor: themas.colors.textSecondary,
  },
  input: {
    height: '100%',
    width: '90%',
    // backgroundColor: 'red',
    borderRadius: 40,
    paddingLeft: 5,
  },
  */

  boxBottom:{
    height: Dimensions.get('window').height/3.5,
    width: '100%',
    // backgroundColor: 'blue',
    alignItems: 'center',
  },
  /*
  button: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themas.colors.buttonPrimary,
    borderRadius: 40,
  },
  textButton: {
    fontSize: 16,
    color: themas.colors.buttonText,
    fontWeight: 'bold'
  },*/
  textRegister: {
    fontSize: 16,
    color: themas.colors.textSecondary
  },
});