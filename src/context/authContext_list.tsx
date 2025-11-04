import React, {createContext, useContext, useRef, useEffect} from "react";
import {Alert, Dimensions, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Modalize} from 'react-native-modalize';
import { MaterialIcons, AntDesign} from '@expo/vector-icons';
import {Input} from "../components/input";
import { themas } from "../global/themes";
import {Flag} from "../components/flag";

export const AuthContextList = createContext({});

const flags = [
  {caption: 'Produção', color: themas.colors.primary},
  {caption: 'Entregue', color: themas.colors.success},
  {caption: 'Cancelado', color: themas.colors.accent},
]

export const AuthProviderList = (props:any): any =>{

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef?.current?.open()
  }

  const _renderFlags = () =>{
    return (flags.map((item,index) =>(
        <TouchableOpacity key={index}>
          <Flag 
            caption={item.caption} 
            color={item.color}

          />
        </TouchableOpacity>
    )))
    
  }
  const _container = () => {
    return (
      <View style={style.container}>
        <View style={style.header}>
          <TouchableOpacity>
            <MaterialIcons name="close" size={30}/>
          </TouchableOpacity>

          <Text style={style.title}>Criar Pedido</Text>

          <TouchableOpacity>
            <AntDesign name="check" size={30}/>
          </TouchableOpacity>
        </View>
        <View style={style.content}>
          <Input
            title= "Titulo:"
            labelStyle={style.label}
          />
          <Input
            title= "Descrição:"
            labelStyle={style.label}
            height={100}
            multiline
            numberOfLines={5}
          />
          <View style={{width:'40%'}}>
            <Input 
              title= "Tempo Limite:"
              labelStyle={style.label}
            />
          </View>

          <View style={style.containerFlag}>
            <Text style={style.label}> Flags:</Text>
            <View style={style.rowFlags}>
              {_renderFlags()}
            </View>
            
          </View>
        </View>
      </View>
    )
  }

  return(
    <AuthContextList.Provider value={{onOpen}}>
      {props.children}
      <Modalize
        ref={modalizeRef}
        // modalHeight={Dimensions.get('window').height/1.3}
        childrenStyle={{ height: Dimensions.get('window').height/1.3}}
      >
        {_container()}
      </Modalize>
    </AuthContextList.Provider>
  )
}

export const useAuth = () => useContext(AuthContextList);

export const style = StyleSheet.create({
  container:{
    width:'100%'
  },
  header:{
    width:'100%',
    height: 40,
    paddingHorizontal: 40,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  content:{
    width: '100%',
    paddingHorizontal: 20
  },
  containerFlag:{
    width: '100%',
    padding: 10
  },
  label:{
    fontWeight: 'bold',
    color: '#000'
  },
  rowFlags:{
    flexDirection: 'row',
    gap: 10,
    marginTop: 10
  }
})