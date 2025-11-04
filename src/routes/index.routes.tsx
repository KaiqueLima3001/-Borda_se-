import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Login from "../pages/login/index";
import BottomRoutes from "./bottom.routes";
import Welcome from "../pages/welcome/index"
import Register from "../pages/register/index";
import Recovery from "../pages/recovery/index";

export default function Routes (){
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouterName = "BottomRoutes"
      screenOptions={{
        headerShown: false,
        cardStyle:{
          backgoundColor: "#FFF"
        }
      }}
    >
      {/*<Stack.Screen
        name="welcome"
        component={ Welcome }
        options={{ headerShow: false }}
      />

      <Stack.Screen
        name="Login"
        component={ Login }
        options={{ headerShow: false }}
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
      />*/}

      <Stack.Screen
        name="BottomRoutes"
        component={ BottomRoutes }
        options={{ headerShow: false }}
      />
    </Stack.Navigator>
  )
}