import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import {
  Alert,
  Animated,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { ValorInput } from "./../../components/input";
import { CpfInput } from "./../../components/input";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native";
import Slider from "@react-native-community/slider";
export interface AjusteProps {}

export default function AjusteScreen(props: AjusteProps) {
  const nav = useNavigation();
  const [slide, setSlide] = React.useState(100) 
  const [valor, setValor] = React.useState("");
  function handleCustom(value: string) {
    setValor(value);
  }
  const [cpf, setCpf] = React.useState("");
  function handleCustomCpf(value: string) {
    setCpf(value);
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Icon
            color={"#000"}
            style={{ marginRight: 10 }}
            size={40}
            type={"ionicon"}
            name={"close"}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text style={{ fontSize: 25 }}>Ajuste o seu limite</Text>
        <View
          style={{
            width: "100%",
            padding: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 35, color: "#11916f" }}>R$ - 600,00</Text>

          <Text style={{ fontSize: 20, color: "#0f0" }}>
            Disponível: R$ - 300,00
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ width: "100%", justifyContent: "space-between",alignItems: 'center', flexDirection: 'row', paddingLeft: '10%', paddingRight: '10%' }}>
            <Text style={{ fontSize: 20, color: "#000" }}>100</Text>
            <Text style={{ fontSize: 20, color: "#000" }}>600</Text>
          </View>
          <Slider
            style={{ width: "90%", height: 40 }}
            onSlidingComplete={(slide)=>{setSlide(slide)}}
            minimumValue={100}
            maximumValue={600}
            step={100}
            minimumTrackTintColor="#0f0"
            maximumTrackTintColor="#000000"
          />
          
        </View>
        <Text style={{ fontSize: 20, color: "#000" }}>Limite selecionado: R$ - {slide},00</Text>
        <TouchableOpacity
        onPress={() => {
            nav.navigate("principal");
          }}
        
          style={{
            backgroundColor: "#000",
            width: "83%",
            height: 40,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            Continuar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text3: {
    color: "#fff",
    textAlign: "left",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 24,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  backgroundButton: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginBottom: 0,
    flex: 1,
    padding: 0,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    borderRadius: 10,
    margin: 5,
    width: 190,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 10.0,
    elevation: 10,
    borderColor: "#156e65",
    borderWidth: 2,
  },
  container2: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  div: {
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    marginTop: 200,
    display: "flex",
    justifyContent: "center",
    width: 350,
    height: 175,
  },
  logo2: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: 200,
  },
});
