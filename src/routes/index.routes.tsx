import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../context/authContext';
import { themes } from '../global/themes';

import Login from '../pages/login';
import Welcome from '../pages/welcome'; 
import Register from '../pages/register';
import Recovery from '../pages/recovery'; 
import BottomRoutes from './bottom.routes';
import ChangePasswordScreen from "../pages/change-password";
import PersonalDataScreen from "../pages/personal";

const Stack = createStackNavigator();

// Este é um componente que contém todas as telas que o usuário
// vê quando NÃO está logado.
function AuthStack() {
  return (
    <Stack.Navigator
      // Começa na tela de Welcome
      initialRouteName="Welcome" 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: themes.colors.primary }, 
      }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Recovery" component={Recovery} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

// Este é um componente que contém todas as telas que o usuário
// vê quando ESTÁ logado.
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ 
      headerShown: false,
      cardStyle: { backgroundColor: themes.colors.primary }, 
    }}>
      <Stack.Screen name="BottomRoutes" component={BottomRoutes} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      <Stack.Screen name="PersonalDataScreen" component={PersonalDataScreen} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: themes.colors.background,
        }}>
        <ActivityIndicator size="large" color={themes.colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // Se TEM usuário: renderiza o GRUPO de telas do App
        <Stack.Screen name="AppStack" component={AppStack} />
      ) : (
        // Se NÃO tem usuário: renderiza o GRUPO de telas de Auth
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}