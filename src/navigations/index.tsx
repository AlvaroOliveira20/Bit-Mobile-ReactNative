import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack'
import  HomeScreen  from '../screens/home/';
import  LoginScreen  from '../screens/login/';
import  CadastroScreen  from '../screens/cadastro/';
import  PrincipalScreen  from '../screens/principal/';
import  CartaoScreen  from '../screens/cartao/';
import  SplashScreen  from '../screens/splash/';
import  BarcodeScreen from './../screens/barcode-scanner'
import  PixScreen from './../screens/pix'
import  TransferenciaScreen from './../screens/transferencia'
import  AjusteScreen from './../screens/ajuste-limite'
import  BloqueioScreen from './../screens/bloqueio'
import  CartaoVirtualScreen from './../screens/cartao-virtual'
import  CadastroContScreen from './../screens/fimCadastro'
import  ConfiguracoesScreen from './../screens/configuracoes'
import  TransferenciaPixScreen from './../screens/transfPix'
import  ChavesScreen from './../screens/chaves'
import  QrCodeScreen from './../screens/qrcode-scanner'


const Stack = createStackNavigator();

export const NavegacaoPrincipal = () => (
    <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false, cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid }}>
            <Stack.Screen name="splash" component={SplashScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid }}/>
            <Stack.Screen name="home" component={HomeScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid }}/>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="cadastro" component={CadastroScreen} />
            <Stack.Screen name="principal" component={PrincipalScreen} />
            <Stack.Screen name="cartao" component={CartaoScreen} />
            <Stack.Screen name="barcode" component={BarcodeScreen} />
            <Stack.Screen name="pix" component={PixScreen} />
            <Stack.Screen name="transferencia" component={TransferenciaScreen} />
            <Stack.Screen name="ajuste-limite" component={AjusteScreen} />
            <Stack.Screen name="bloqueio" component={BloqueioScreen} />
            <Stack.Screen name="cartao-virtual" component={CartaoVirtualScreen} />
            <Stack.Screen name="cadastro-cont" component={CadastroContScreen} />
            <Stack.Screen name="configuracoes" component={ConfiguracoesScreen} />
            <Stack.Screen name="transferencia-pix" component={TransferenciaPixScreen} />
            <Stack.Screen name="chaves" component={ChavesScreen} />
            <Stack.Screen name="qrcode" component={QrCodeScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)
export const NavegacaoWeb = () => (
    <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false, cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid }}>
            <Stack.Screen name="home" component={HomeScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid }}/>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="cadastro" component={CadastroScreen} />
            <Stack.Screen name="principal" component={PrincipalScreen} />
            <Stack.Screen name="cartao" component={CartaoScreen} />
            <Stack.Screen name="barcode" component={BarcodeScreen} />
            <Stack.Screen name="pix" component={PixScreen} />
            <Stack.Screen name="transferencia" component={TransferenciaScreen} />
            <Stack.Screen name="ajuste-limite" component={AjusteScreen} />
            <Stack.Screen name="bloqueio" component={BloqueioScreen} />
            <Stack.Screen name="cartao-virtual" component={CartaoVirtualScreen} />
            <Stack.Screen name="cadastro-cont" component={CadastroContScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

    