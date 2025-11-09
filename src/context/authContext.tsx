import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { themes } from '../global/themes';

const USER_STORAGE_KEY = '@MeuApp:user';

export interface User {
  identificador: string; 
  nome: string;
  email: string;
  role: 'admin' | 'user';
  tipoUsuario: 'pf' | 'pj';
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (user: User) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromStorage() {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao carregar usuário do AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUserFromStorage();
  }, []); 

  const signIn = async (userData: User) => {
    setLoading(true);
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.log('Usuário logado1:', user?.identificador)
      console.error('Erro ao salvar usuário no signIn:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (userData: User) => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.log('Usuário logado2:', user?.identificador)
      console.error('Erro ao remover usuário no signOut:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};