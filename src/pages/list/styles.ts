import {StyleSheet, Dimensions} from 'react-native';
import {themas} from '../../global/themes'

export const style = StyleSheet.create({
  container:{
    flex:1, 
    alignItems:"center",
  },
  header:{
    width:'100%',
    height: Dimensions.get('window').height/6,
    backgroundColor: themas.colors.background,
    paddingHorizontal:20,
    justifyContent: 'center'
  },
  greeting: {
    fontSize: 20,
    color: themas.colors.secondary,
    marginTop: 20
  },
  boxInput: {
    width: '80%'
  }
});