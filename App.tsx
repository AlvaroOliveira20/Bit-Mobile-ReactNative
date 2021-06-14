import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavegacaoPrincipal } from './src/navigations';
import { NavegacaoWeb } from './src/navigations';
import firebase from 'firebase';
import { firebaseConfig } from './src/environments/firebase';

firebase.initializeApp(firebaseConfig)

export default function App() {
  
  if (Platform.OS == "ios" || Platform.OS == "android"){
    return (<NavegacaoPrincipal/>);
    
  }else{
    return (<NavegacaoWeb/>);
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
