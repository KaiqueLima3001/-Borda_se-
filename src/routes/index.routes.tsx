import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from "../pages/Welcome/index";
import Login from "../pages/login/index";
import BottomRoutes from "./bottom.routes";
import EscolhaPerfil from "../pages/EscolhaPerfil/index";

export default function Routes (){
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouterName = "BottomRoutes"
      screenOptions={{
        headerShown:false,
        cardStyle:{
          backgoundColor: "#FFF"
        }
      }}
    >
      <Stack.Screen
        name="EscolherPerfil"
        component={EscolhaPerfil}
        options={{headerShow: false}}
      />

      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShow: false}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShow: false}}
      />

      <Stack.Screen
        name="BottomRoutes"
        component={BottomRoutes}
        options={{headerShow: false}}
      />
    </Stack.Navigator>
  )
}