import {StyleSheet, Dimensions} from 'react-native';
import {themes} from '../../global/themes'
import { Metrics } from '../../global/metrics'; 

export const style = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.colors.primary
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
  boxTop:{
    height: Dimensions.get('window').height/3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: themes.colors.secondary
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
    height: 'auto', 
    width: '100%',
    alignItems: 'center',
    marginTop: Metrics.spacing.md, 
    paddingHorizontal: 37,
  },
  textRegister: {
    fontSize: 16,
    color: themes.colors.textSecondary
  },
  forgotPasswordButton: {
    width: '100%', 
    alignItems: 'center', 
    marginTop: 15, 
    paddingVertical: 10,
  },
  forgotPasswordText: {
    color: themes.colors.accent,
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});