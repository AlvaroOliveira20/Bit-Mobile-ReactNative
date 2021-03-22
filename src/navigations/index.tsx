import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack'
import  HomeScreen  from '../screens/home/';
import  LoginScreen  from '../screens/login/';
import  CadastroScreen  from '../screens/cadastro/';

const Stack = createStackNavigator();

export const NavegacaoPrincipal = () => (
    <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false, cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid }}>
            <Stack.Screen name="home" component={HomeScreen} options={{ }}/>
            <Stack.Screen name="login" component={LoginScreen} options={{ }}/>
            <Stack.Screen name="cadastro" component={CadastroScreen} options={{ }}/>
        </Stack.Navigator>
    </NavigationContainer>
)

    