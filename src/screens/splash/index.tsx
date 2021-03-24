import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { StackActions } from '@react-navigation/native';
import { CardAnimationContext, CardStyleInterpolators } from '@react-navigation/stack';

export interface SplashProps {}

export default function SplashScreen(props: SplashProps) {

    const nav = useNavigation();
    

    function navigate(){
        nav.navigate('home' );
        nav.reset({
            index: 0,
            routes: [
              {
                name: 'home',
              }
            ],
          })
    }
    return (  
        <LottieView onAnimationFinish ={() => navigate()} style = {{backgroundColor:'white'}}source={require('./../splash/lottie.json')}  autoPlay loop={false}/>

    );

}
    
const styles = StyleSheet.create({
    
    
    
    
});
 