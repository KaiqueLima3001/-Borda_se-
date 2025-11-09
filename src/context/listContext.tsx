import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  useMemo, 
  useCallback, 
  useEffect, 
} from 'react';
import {
  Alert,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons'; 

import { Input } from '../components/input/index';
import { Flag } from '../components/flag/index';
import { Button } from '../components/button/index';

import { styles } from './styles';
import { themes } from '../global/themes';
import { Metrics } from '../global/metrics';

import { useAuth } from './authContext';
import { FIRESTORE_PEDIDOS_URL } from '../config/api';

interface PedidoFlag {
  caption: string;
  color: string;
}
export interface Pedido {
  id: string;
  title: string;
  description: string;
  flag: PedidoFlag;
  usuarioIdentificador: string;
  usuarioNome?: string;
  timeLimit?: string;
}

interface FlagData {
  caption: string;
  color: string;
}
interface ListContextData {
  pedidos: Pedido[]; 
  loadingPedidos: boolean;
  fetchPedidos: () => Promise<void>;
  onOpen: (pedido?: Pedido) => void;
}
interface ListProviderProps {
  children: ReactNode;
}
const ListContext = createContext({} as ListContextData);
const flags: FlagData[] = [
  { caption: 'Produção', color: themes.colors.primary },
  { caption: 'Entregue', color: themes.colors.success },
  { caption: 'Cancelado', color: themes.colors.accent },
];

export const ListProvider = (props: ListProviderProps) => {
  const { user, loading: authLoading } = useAuth();
  const modalizeRef = useRef<Modalize>(null);

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loadingPedidos, setLoadingPedidos] = useState(true);

  const [loadingModal, setLoadingModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [usuarioIdentificador, setUsuarioIdentificador] = useState('');
  const [selectedFlag, setSelectedFlag] = useState<FlagData | null>(null);

  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [selectedPedidoId, setSelectedPedidoId] = useState<string | null>(null);

  const fetchPedidos = useCallback(async () => {
    if (!user) {
      setLoadingPedidos(false);
      return;
    }
    setLoadingPedidos(true);
    try {
      const response = await fetch(FIRESTORE_PEDIDOS_URL);
      if (!response.ok) {
        throw new Error('Falha ao buscar dados.');
      }
      const data = await response.json();
      const pedidosFormatados: Pedido[] = (data.documents || [])
        .map((doc: any) => {
          const id = doc.name.split('/').pop();
          const fields = doc.fields;
          if (!fields || !fields.title || !fields.flag) {
            return null;
          }
          return {
            id: id,
            title: fields.title.stringValue || '',
            description: fields.description?.stringValue || '',
            usuarioIdentificador:
              fields.usuarioIdentificador?.stringValue || '',
            usuarioNome: fields.usuarioNome?.stringValue || '',
            timeLimit: fields.timeLimit?.stringValue || '',
            flag: {
              caption:
                fields.flag.mapValue.fields.caption?.stringValue || 'N/A',
              color: fields.flag.mapValue.fields.color?.stringValue || '#ccc',
            },
          };
        })
        .filter((pedido: Pedido | null) => pedido !== null);
      setPedidos(pedidosFormatados);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      setPedidos([]);
    } finally {
      setLoadingPedidos(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchPedidos();
    }
    if (!authLoading && !user) {
      setPedidos([]); 
    }
  }, [user, authLoading, fetchPedidos]); 

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setTime('');
    setUsuarioIdentificador('');
    setSelectedFlag(null);
    setLoadingModal(false);
    setMode('create');
    setSelectedPedidoId(null);
  };

  const onOpen = (pedido?: Pedido) => {
    if (!user || user.role !== 'admin') {
      Alert.alert(
        'Acesso Restrito',
        'Apenas administradores podem gerenciar pedidos.',
      );
      return;
    }
    if (pedido) {
      setMode('edit');
      setSelectedPedidoId(pedido.id);
      setTitle(pedido.title);
      setDescription(pedido.description);
      setTime(pedido.timeLimit || '');
      setUsuarioIdentificador(pedido.usuarioIdentificador);
      setSelectedFlag(pedido.flag);
    } else {
      clearForm();
      setMode('create');
      setSelectedPedidoId(null);
    }
    modalizeRef?.current?.open();
  };

  const onClose = () => {
    modalizeRef?.current?.close();
  };

  const modalContent = useMemo(() => {
    const handleSavePedido = async () => {
      if (!user) {
        Alert.alert('Erro', 'Você não está logado.');
        return;
      }
      if (!title || !usuarioIdentificador || !selectedFlag) {
        Alert.alert('Campos Obrigatórios', 'Preencha Título, Usuário e Flag.');
        return;
      }

      setLoadingModal(true);
      const body = {
        fields: {
          title: { stringValue: title },
          description: { stringValue: description },
          timeLimit: { stringValue: time },
          usuarioIdentificador: { stringValue: usuarioIdentificador },
          status: { stringValue: 'open' },
          createdAt: { timestampValue: new Date().toISOString() },
          adminCriadorIdentificador: { stringValue: user.identificador },
          adminCriadorNome: { stringValue: user.nome },
          flag: {
            mapValue: {
              fields: {
                caption: { stringValue: selectedFlag.caption },
                color: { stringValue: selectedFlag.color },
              },
            },
          },
        },
      };

      try {
        let url = FIRESTORE_PEDIDOS_URL;
        let method = 'POST';
        if (mode === 'edit' && selectedPedidoId) {
          url = `${FIRESTORE_PEDIDOS_URL}/${selectedPedidoId}`;
          method = 'PATCH';
        }
        const response = await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`Falha ao ${mode} o pedido.`);
        }

        await fetchPedidos(); 

        Alert.alert('Sucesso!', `O pedido foi ${mode === 'create' ? 'criado' : 'atualizado'}.`);
        clearForm();
        onClose();
      } catch (error) {
        console.error(`Erro ao ${mode} pedido (fetch):`, error);
        Alert.alert('Erro', `Não foi possível ${mode} o pedido.`);
      } finally {
        setLoadingModal(false);
      }
    };

    const handleDeletePedido = async () => {
      if (!selectedPedidoId) return;
      Alert.alert(
        'Confirmar Exclusão',
        'Você tem certeza que deseja excluir este pedido?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Excluir',
            style: 'destructive',
            onPress: async () => {
              setLoadingModal(true);
              const url = `${FIRESTORE_PEDIDOS_URL}/${selectedPedidoId}`;
              try {
                const response = await fetch(url, { method: 'DELETE' });
                if (!response.ok) {
                  throw new Error('Falha ao excluir o pedido.');
                }
                
                await fetchPedidos(); 

                Alert.alert('Sucesso!', 'O pedido foi excluído.');
                clearForm();
                onClose();
              } catch (error) {
                console.error('Erro ao excluir pedido (fetch):', error);
                Alert.alert('Erro', 'Não foi possível excluir o pedido.');
              } finally {
                setLoadingModal(false);
              }
            },
          },
        ],
      );
    };

    const _renderFlags = () => {
      return flags.map((item, index) => (
        <TouchableOpacity
          key={item.caption} 
          style={[
            styles.flagButton,
            selectedFlag?.caption === item.caption && styles.flagSelected,
          ]}
          onPress={() => setSelectedFlag(item)} 
        >
          <Flag caption={item.caption} color={item.color} />
        </TouchableOpacity>
      ));
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons
              name="close"
              size={styles.iconSize.width}
              color={themes.colors.textSecondary}
            />
          </TouchableOpacity>
          <Text style={styles.title}>
            {mode === 'create' ? 'Criar Pedido' : 'Editar Pedido'}
          </Text>
          <TouchableOpacity onPress={handleSavePedido}>
            <AntDesign
              name="check"
              size={styles.iconSize.width}
              color={themes.colors.success}
            />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Input
            title="Atribuir ao Usuário (CPF/CNPJ):"
            labelStyle={styles.label}
            placeholder="Digite o CPF ou CNPJ do usuário"
            value={usuarioIdentificador}
            onChangeText={setUsuarioIdentificador}
            keyboardType="numeric"
          />
          <Input
            title="Número do Pedido:"
            labelStyle={styles.label}
            placeholder="Ex: Pedido #123"
            value={title}
            onChangeText={setTitle}
          />
          <Input
            title="Descrição:"
            labelStyle={styles.label}
            placeholder="Detalhes do pedido..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            inputStyle={styles.descriptionInput}
          />
          <View style={{ width: '60%' }}>
            <Input
              title="Tempo Limite:"
              labelStyle={styles.label}
              placeholder="Ex: 30 dias"
              value={time}
              onChangeText={setTime}
            />
          </View>
          <View style={styles.containerFlag}>
            <Text style={styles.label}>Flags:</Text>
            <View style={styles.rowFlags}>{_renderFlags()}</View>
          </View>

          <Button
            title={mode === 'create' ? 'Salvar Pedido' : 'Salvar Alterações'}
            variant="primary"
            onPress={handleSavePedido}
            loading={loadingModal} 
            style={{ marginTop: Metrics.spacing.xl }}
          />

          {mode === 'edit' && (
            <Button
              title="Excluir Pedido"
              variant="outline"
              onPress={handleDeletePedido}
              loading={loadingModal} 
              style={{
                marginTop: Metrics.spacing.md,
                borderColor: themes.colors.error,
              }}
            />
          )}
        </ScrollView>
      </View>
    );
  }, [
    user,
    loadingModal,
    title,
    description,
    time,
    usuarioIdentificador,
    selectedFlag,
    mode,
    selectedPedidoId,
    fetchPedidos, 
  ]);

  if (authLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: themes.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={themes.colors.primary} />
      </View>
    );
  }

  return (
    <ListContext.Provider
      value={{ onOpen, pedidos, loadingPedidos, fetchPedidos }}>
      {props.children}
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight={true}
        onClosed={clearForm}
      >
        {modalContent}
      </Modalize>
    </ListContext.Provider>
  );
};

export const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useList deve ser usado dentro de um ListProvider');
  }
  return context;
};