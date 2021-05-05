import { maskCpf } from './../utils/mask'
import { maskValor } from './../utils/mask'
import * as React from 'react';
import { View, Button, TouchableOpacity,Image, StyleSheet, ImageBackground, Text, Alert, TextInputProps} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon, Input} from "react-native-elements";



interface InputProps extends TextInputProps{
    mask: "cpf",
    inputMaskChange: any
}
const CpfInput: React.FC<InputProps> = ({ mask, inputMaskChange, ... rest}) =>{

    function handleChange(text: string){
        const value = maskCpf(text)
        inputMaskChange(value)
    }

    return(
        <Input {... rest}
        leftIcon={{ type: "font-awesome", name: "id-card" }}
        onChangeText={text => handleChange(text)} ></Input>
    )

}



interface InputValorProps extends TextInputProps{
    mask: "valor",
    inputMaskChange: any
}
const ValorInput: React.FC<InputValorProps> = ({ mask, inputMaskChange, ... rest}) =>{

    function handleChange(text: string){
        const value = maskValor(text)
        inputMaskChange(value)
    }

    return(
        <Input {... rest}
            onChangeText={text => handleChange(text)}
            keyboardType="number-pad"
            placeholder={"0,00"}
            maxLength={15}
            
          ></Input>
    )

}
export {ValorInput, CpfInput} 