import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from "../pages/Welcome/index";
import Login from "../pages/login/index";
import BottomRoutes from "./bottom.routes";
import EscolhaPerfil from "../pages/EscolhaPerfil/index";
import Register from "../pages/register/index";
import Recovery from "../pages/recovery/index";

export default function Routes (){
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="EscolherPerfil" 
      screenOptions={{
        headerShown: false, 
        cardStyle: {
          backgroundColor: "#FFF" 
        }
      }}
    >
      <Stack.Screen
        name="EscolherPerfil"
        component={EscolhaPerfil}
        options={{ headerShown: false }} 
      />

      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }} 
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }} 
      />

      <Stack.Screen
        name="Recovery"
        component={Recovery}
        options={{ headerShown: false }}
      />
        
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BottomRoutes"
        component={BottomRoutes}
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  )
}