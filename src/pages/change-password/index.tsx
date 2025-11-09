import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons, Octicons } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './styles';
import { Input } from '../../components/input/index';
import { Button } from '../../components/button/index';

import { useAuth } from '../../context/authContext';
import { FIRESTORE_DADOS_CADASTRAIS_URL } from '../../config/api';

export default function ChangePasswordScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const insets = useSafeAreaInsets(); 

  const { user } = useAuth();

  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [showSenhaAntiga, setShowSenhaAntiga] = useState(true);
  const [showNovaSenha, setShowNovaSenha] = useState(true);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(true);

  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!senhaAntiga || !novaSenha || !confirmarSenha) {
      return Alert.alert('Atenção', 'Preencha todos os campos!');
    }
    if (novaSenha.length < 6) {
      return Alert.alert('Atenção', 'A nova senha deve ter pelo menos 6 caracteres!');
    }
    if (novaSenha !== confirmarSenha) {
      return Alert.alert('Atenção', 'As novas senhas não coincidem!');
    }
    if (!user) {
      return Alert.alert('Erro', 'Usuário não encontrado.');
    }

    setLoading(true);

    try {
      const responseGet = await fetch(FIRESTORE_DADOS_CADASTRAIS_URL);
      const dataGet = await responseGet.json();
      if (!dataGet.documents) {
        throw new Error('Nenhum usuário encontrado no banco de dados.');
      }
      
      let documentId: string | null = null;
      let senhaSalva: string | null = null;
      for (const doc of dataGet.documents) {
        const fields = doc.fields;
        if (fields.identificador?.stringValue === user.identificador) {
          documentId = doc.name.split('/').pop();
          senhaSalva = fields.senha?.stringValue || null;
          break;
        }
      }

      if (!documentId || !senhaSalva) {
        throw new Error('Usuário não encontrado ou senha corrompida.');
      }

      if (senhaSalva !== senhaAntiga.trim()) {
        throw new Error('A "Senha Antiga" está incorreta.');
      }

      const firestoreUrl = `${FIRESTORE_DADOS_CADASTRAIS_URL}/${documentId}?updateMask.fieldPaths=senha`;
      
      const body = {
        fields: {
          senha: { stringValue: novaSenha.trim() },
        },
      };

      const responsePatch = await fetch(firestoreUrl, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!responsePatch.ok) {
        throw new Error('Falha ao atualizar a senha no banco de dados.');
      }
      
      Alert.alert(
        'Sucesso',
        'Senha alterada com sucesso!',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );

    } catch (error) {
      // console.error('Erro ao alterar senha:', error);
      Alert.alert('Erro', `${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.headerTitle}>Alterar Senha</Text>
          <Text style={styles.description}>
            Crie uma nova senha para sua conta.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Senha Antiga *</Text>
            <Input
              value={senhaAntiga}
              onChangeText={setSenhaAntiga}
              placeholder="Digite sua senha atual"
              secureTextEntry={showSenhaAntiga}
              IconRight={Octicons} 
              iconRightName={showSenhaAntiga ? 'eye-closed' : 'eye'}
              onIconRightPress={() => setShowSenhaAntiga(!showSenhaAntiga)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nova Senha *</Text>
            <Input
              value={novaSenha}
              onChangeText={setNovaSenha}
              placeholder="Digite a nova senha"
              secureTextEntry={showNovaSenha}
              IconRight={Octicons}
              iconRightName={showNovaSenha ? 'eye-closed' : 'eye'}
              onIconRightPress={() => setShowNovaSenha(!showNovaSenha)}
            />
            <Text style={styles.passwordHint}>Mínimo de 6 caracteres</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirmar Nova Senha *</Text>
            <Input
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              placeholder="Confirme a nova senha"
              secureTextEntry={showConfirmarSenha}
              IconRight={Octicons}
              iconRightName={showConfirmarSenha ? 'eye-closed' : 'eye'}
              onIconRightPress={() => setShowConfirmarSenha(!showConfirmarSenha)}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="ALTERAR SENHA" 
              loading={loading}
              onPress={handleChangePassword}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}