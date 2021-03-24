import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack'
import  HomeScreen  from '../screens/home/';
import  LoginScreen  from '../screens/login/';
import  CadastroScreen  from '../screens/cadastro/';
import  PrincipalScreen  from '../screens/principal/';
import  SplashScreen  from '../screens/splash/';

const Stack = createStackNavigator();

export const NavegacaoPrincipal = () => (
    <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false, cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid }}>
            <Stack.Screen name="splash" component={SplashScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid }}/>
            <Stack.Screen name="home" component={HomeScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid }}/>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="cadastro" component={CadastroScreen} />
            <Stack.Screen name="principal" component={PrincipalScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

    