import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './styles';
import { Input } from '../../components/input/index';
import { Ball } from '../../components/ball';
import { Flag } from '../../components/flag';

import { themes } from '../../global/themes';
import { useAuth } from '../../context/authContext';
import { useList, Pedido } from '../../context/listContext';

const getFirstName = (fullName: string | undefined) => {
  if (!fullName) return 'Usuário';
  return fullName.split(' ')[0];
};

export default function List() {
  const { user } = useAuth();
  const { onOpen, pedidos, loadingPedidos, fetchPedidos } = useList();

  const [filteredPedidos, setFilteredPedidos] = useState<Pedido[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchPedidos();
      }
    }, [user, fetchPedidos]), 
  );

  useEffect(() => {
    if (!user) {
      setFilteredPedidos([]);
      return;
    }
    let lista = [...pedidos]; 
    if (user.role === 'user') { 
      lista = lista.filter(
        (pedido) => pedido.usuarioIdentificador === user.identificador,
      );
    }
    if (searchTerm.length > 0) {
      lista = lista.filter((pedido) =>
        pedido.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredPedidos(lista);
  }, [pedidos, user, searchTerm]); 

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={themes.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const _renderCard = ({ item }: { item: Pedido }) => {
    const isAdmin = user?.role === 'admin';

    return (
      <TouchableOpacity style={styles.card} onPress={isAdmin ? () => onOpen(item) : undefined} activeOpacity={isAdmin ? 0.7 : 1.0}>
        <View style={styles.rowCard}>
          <View style={styles.rowCardLeft}>
            <Ball color={item.flag.color} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.titleCard}> {item.title} </Text>
              <Text style={styles.descriptionCard}> {item.description} </Text>
              {item.timeLimit ? (
                <View style={styles.timeLimitContainer}>
                  <MaterialIcons name="access-time" size={14} color={themes.colors.error} />
                  <Text style={styles.timeLimitText}>Prazo limite: {item.timeLimit}</Text>
                </View>
              ) : null}
            </View>
          </View>
          <Flag caption={item.flag.caption} color={item.flag.color} />
        </View>
      </TouchableOpacity>
    );
  };

  const _renderContent = () => {
    if (loadingPedidos) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={themes.colors.primary} />
          <Text style={styles.centeredText}>Buscando pedidos...</Text>
        </View>
      );
    }
    if (filteredPedidos.length === 0) {
      return (
        <View style={styles.centered}>
          <MaterialIcons
            name="inbox"
            size={40}
            color={themes.colors.textSecondary}
          />
          <Text style={styles.centeredText}>Nenhum pedido encontrado.</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={filteredPedidos}
        style={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={_renderCard}
        contentContainerStyle={styles.listContent}
        onRefresh={fetchPedidos}
        refreshing={loadingPedidos}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={
          styles.header
        }>
        <Text style={styles.greeting}>
          Olá,{' '}
          <Text style={{ fontWeight: 'bold' }}>{getFirstName(user?.nome) || 'Usuário'}</Text>
        </Text>
        <View style={styles.boxInput}>
          <Input
            title=""
            placeholder="Buscar por título..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            IconRight={MaterialIcons}
            iconRightName="search"
          />
        </View>
      </View>
      <View style={styles.boxList}>{_renderContent()}</View>
    </SafeAreaView>
  );
}