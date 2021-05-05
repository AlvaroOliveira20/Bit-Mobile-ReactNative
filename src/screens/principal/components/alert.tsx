import * as React from 'react';
import { View, Text } from 'react-native';
export interface AppProps {
  titulo?:string;
  visivel:boolean;
  onConfirmar();
  onCancelar();
}
export function AlertCustom (props: AppProps) {
   return (<View><Text>App</Text></View>);
}
