import React from "react";
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome, Octicons, AntDesign, Entypo} from '@expo/vector-icons';

import { style } from "./styles";
import {Input} from "../../components/input/index";
import {Ball} from "../../components/ball";
import {Flag} from "../../components/flag";

import {themas} from '../../global/themes'

type PropCard = {
  item: number,
  title: string,
  description: string,
  flag: 'Urgente'|'Opcional'
}

const data:Array<PropCard> = [
  {
    item: 0,
    title: 'Realizar a lição de casa!',
    description: 'Página 10 a 20',
    flag:'urgente'
  },
  {
    item: 1,
    title: 'Passear com o cachorro!',
    description: 'página 10 a 20',
    flag:'urgente'
  },
  {
    item: 2,
    title: 'Sair para tomar açai!',
    description: 'página 10 a 20',
    flag:'urgente'
  },
]

export default function List(){

  const _renderCard = (item:PropCard)=>{
    return(
      <TouchableOpacity style={style.card}>
        <View style={style.rowCard}>
          <View style={style.rowCardLeft}>
            <Ball color="red" />
            <View>
              <Text style={style.titleCard}> {item.title} </Text>
              <Text style={style.descriptionCard}> {item.description} </Text>
            </View>
          </View>
          <Flag caption="Urgente" color={themas.colors.error}/>
        </View> 
      </TouchableOpacity>
    )
  }

  return(
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.greeting}>Bom dia <Text style={{fontWeight:"bold"}}>Kaique L.</Text></Text>
        <View style={style.boxInput}>
          <Input
            IconRight={MaterialIcons}
            iconRightName="search"
          />
        </View>
      </View>
      <View style={style.boxList}>
        <FlatList
          data={data}
          style={{marginTop:40,paddingHorizontal:30}}
          keyExtractor={(item, index) => item.item.toString()}
          renderItem={({item,index})=>{ return (_renderCard(item))}}
        />

      </View>
    </View>
  )
}