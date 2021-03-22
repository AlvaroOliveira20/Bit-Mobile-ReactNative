import { maskCpf } from './../utils/mask'
import * as React from 'react';
import { View, Button, TouchableOpacity,Image, StyleSheet, ImageBackground, Text, Alert, TextInputProps} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Input} from "react-native-elements";



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
export default CpfInput