import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

export default function Router() {
  return(
    <NavigationContainer>

      {/* essa propriedade  headerShown desativa o cabeçalho na parte superior do app */}
      <AppStack.Navigator screenOptions={{ headerShown: false}}> 
        <AppStack.Screen name="Incidents" component={Incidents}/>
        <AppStack.Screen name="Detail" component={Detail}/>
      </AppStack.Navigator>


    </NavigationContainer>

  );
}