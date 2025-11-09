import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator, 
  Platform, 
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './styles';
import { Input } from '../../components/input/index';
import { Button } from '../../components/button/index';

import { useAuth, User } from '../../context/authContext';
import { FIRESTORE_DADOS_CADASTRAIS_URL } from '../../config/api';
import { themes } from '../../global/themes';

export default function PersonalDataScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const insets = useSafeAreaInsets();
  const { user, signIn } = useAuth(); 

  const [docId, setDocId] = useState<string | null>(null); 
  const [loading, setLoading] = useState(false); 
  const [pageLoading, setPageLoading] = useState(true); 

  const [name, setName] = useState(user?.nome || '');
  
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [genero, setGenero] = useState('');

  useEffect(() => {
    if (!user) {
      setPageLoading(false);
      return;
    }

    const fetchUserData = async () => {
      setPageLoading(true);
      try {
        const responseGet = await fetch(FIRESTORE_DADOS_CADASTRAIS_URL);
        const dataGet = await responseGet.json();
        
        if (!dataGet.documents) {
          throw new Error('Nenhum usuário encontrado.');
        }
        
        for (const doc of dataGet.documents) {
          const fields = doc.fields;
          if (fields.identificador?.stringValue === user.identificador) {
            setDocId(doc.name.split('/').pop()); 
            
            setTelefone(fields.telefone?.stringValue || '');
            setDataNascimento(fields.dataNascimento?.stringValue || '');
            setGenero(fields.genero?.stringValue || '');
            
            setName(fields.nome?.stringValue || user.nome);
            
            break; 
          }
        }
      } catch (error) {
        // console.error('Erro ao buscar dados do usuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar seus dados.');
      } finally {
        setPageLoading(false);
      }
    };

    fetchUserData();
  }, [user]); 

  const getInitial = () => {
    const nameToUse = name || user?.nome || '';
    if (!nameToUse.trim()) return '?';
    const names = nameToUse.trim().split(' ');
    const firstInitial = names[0].charAt(0).toUpperCase();
    if (names.length === 1) return firstInitial;
    const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
    return firstInitial + lastInitial;
  };

  const getAvatarColor = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    const nameToUse = name || user?.nome || '';
    if (!nameToUse.trim()) return colors[0];
    const charCode = nameToUse.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const handleSave = async () => {
    if (!name) {
      return Alert.alert('Atenção', 'O campo "Nome" é obrigatório!');
    }
    if (!user || !docId) {
      return Alert.alert('Erro', 'Usuário não encontrado. Tente novamente.');
    }

    setLoading(true);

    try {
      const firestoreUrl = `${FIRESTORE_DADOS_CADASTRAIS_URL}/${docId}`;

      const body = {
        fields: {
          nome: { stringValue: name.trim() },
          telefone: { stringValue: telefone.trim() },
          dataNascimento: { stringValue: dataNascimento.trim() },
          genero: { stringValue: genero.trim() },
        },
      };

      const updateMasks = Object.keys(body.fields)
        .map(key => `updateMask.fieldPaths=${key}`)
        .join('&');
      
      const responsePatch = await fetch(`${firestoreUrl}?${updateMasks}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!responsePatch.ok) {
        const errorData = await responsePatch.json();
        // console.error('Erro no PATCH:', errorData);
        throw new Error('Falha ao atualizar os dados no banco de dados.');
      }

      const updatedUser: User = {
        ...user,
        nome: name.trim(),
      };
      await signIn(updatedUser); 

      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      navigation.goBack();
    } catch (error) {
      // console.error('Erro ao salvar dados:', error);
      Alert.alert('Erro', `Não foi possível salvar os dados. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNavigateToDelete = () => {
    navigation.navigate('AccountDeletion');
  };

  if (pageLoading) {
    return (
      <SafeAreaView style={[styles.container, {justifyContent: 'center', alignItems: 'center', paddingTop: insets.top}]}>
        <ActivityIndicator size="large" color={themes.colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={28} color={themes.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dados Pessoais</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.description}>
            Gerencie suas informações pessoais e de contato.
          </Text>

          <View style={styles.photoContainer}>
            <View style={[styles.avatar, { backgroundColor: getAvatarColor() }]}>
              <Text style={styles.avatarText}>{getInitial()}</Text>
            </View>
            <Text style={styles.photoText}>
              Seu avatar é gerado automaticamente
            </Text>
          </View>

          <Input
            title="CPF / CNPJ (Inalterável)" 
            value={user?.identificador || ''}
            editable={false}
            inputStyle={styles.inputTextDisabled}
          />

          <Input
            title="Email (Inalterável)" 
            value={user?.email || ''} 
            editable={false}
            inputStyle={styles.inputTextDisabled}
          />
          
          <Input
            title="Nome Completo"
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome completo"
          />

          <Input
            title="Telefone"
            placeholder="(xx) xxxxx-xxxx"
            value={telefone}
            onChangeText={(text) => {
              const cleaned = text.replace(/\D/g, '');
              let formatted = cleaned;

              if (cleaned.length <= 2) {
                formatted = `(${cleaned}`;
              } else if (cleaned.length <= 7) {
                formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
              } else if (cleaned.length <= 11) {
                formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
              } else {
                formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
              }

              setTelefone(formatted);
            }}
            keyboardType="phone-pad"
            maxLength={15}
          />


          <Input
            title="Data de Nascimento"
            placeholder="DD/MM/AAAA"
            value={dataNascimento}
            onChangeText={(text) => {
              const cleaned = text.replace(/\D/g, '');
              let formatted = cleaned;

              if (cleaned.length <= 2) {
                formatted = cleaned;
              } else if (cleaned.length <= 4) {
                formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
              } else {
                formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
              }

              setDataNascimento(formatted);
            }}
            keyboardType="numeric"
            maxLength={10}
          />

          <Text style={styles.inputLabel}>Gênero</Text>
          <View style={styles.genderContainer}>
            {['Masculino', 'Feminino'].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setGenero(option)}
                style={[
                  styles.genderButton,
                  genero === option && styles.genderButtonSelected,
                ]}>
                <Text
                  style={[
                    styles.genderText,
                    genero === option && styles.genderTextSelected,
                  ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="SALVAR ALTERAÇÕES"
              loading={loading}
              onPress={handleSave}
            />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}