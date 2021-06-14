import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { Platform, TouchableOpacity } from "react-native";
import {
  Alert,
  Animated,
  FlatList,
  Image,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { Icon, Input } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { ValorInput } from "./../../components/input";
import { CpfInput } from "./../../components/input";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native";
import firebase from "firebase";
import "firebase/firestore";

export interface TransferenciaPixProps {}

export default function TransferenciaPixScreen(props: TransferenciaPixProps) {
  const nav = useNavigation();
  const [valor, setValor] = React.useState("R$ - ");
  const [chave, setChave] = React.useState("");
  const [agencia, setAgencia] = React.useState("");
  const [send, setSend] = React.useState(0);
  function handleCustom(value: string) {
    setValor(value);
  }
  async function transferir() {
    try {
      setSend(1);
      if (valor.length < 8) {
        if (Platform.OS == "android") {
          ToastAndroid.showWithGravity(
            "Valor inválido",
            2000,
            ToastAndroid.CENTER
          );
        } else {
          alert("Valor inválido");
        }
      } else if (!chave) {
        if (Platform.OS == "android") {
          ToastAndroid.showWithGravity(
            "Informe a Chave PIX!",
            2000,
            ToastAndroid.CENTER
          );
        } else {
          alert("Informe a Chave PIX!");
        }
      
      } else {
        let valorInt: any = valor.split(" ");
        valorInt = valorInt[2];
        valorInt = valorInt.split(".");
        valorInt = valorInt[0] + valorInt[1];
        valorInt = valorInt.split(",");
        valorInt = valorInt[0] + "." + valorInt[1];
        valorInt = parseFloat(valorInt);

        console.log(valorInt);

        let db = firebase.firestore();
        const user = firebase.auth().currentUser;

        let snapshot = await db
          .collection("Users")
          .where("uid", "==", user?.uid)
          .get();
        let usuario = snapshot.empty ? null : snapshot.docs[0].data();
        let usuarioAtual = usuario;
        if (usuario?.chave != chave) {
          snapshot = await db
            .collection("Users")
            .where("chave", "==", chave)
            .get();
          usuario = snapshot.empty ? null : snapshot.docs[0].data();

          if (usuario) {
            if (usuarioAtual?.saldo >= valorInt) {
              await db
                .collection("Users")
                .doc(usuario?.uid)
                .update({
                  saldo: usuario?.saldo + valorInt,
                });
              await db
                .collection("Users")
                .doc(usuarioAtual?.uid)
                .update({
                  saldo: usuarioAtual?.saldo - valorInt,
                });
              if (Platform.OS == "android") {
                ToastAndroid.showWithGravity(
                  "Transferência realizada!",
                  2000,
                  ToastAndroid.CENTER
                );
              } else {
                alert("Transferência realizada!");
              }
              nav.navigate("principal")
            } else {
              if (Platform.OS == "android") {
                ToastAndroid.showWithGravity(
                  "Saldo insuficiente!",
                  2000,
                  ToastAndroid.CENTER
                );
              } else {
                alert("Saldo insuficiente!");
              }
            }
          } else {
            if (Platform.OS == "android") {
              ToastAndroid.showWithGravity(
                "A chave não foi encontrada!",
                2000,
                ToastAndroid.CENTER
              );
            } else {
              alert("A chave não foi encontrada!");
            }
          }
        } else {
            if (Platform.OS == "android") {
              ToastAndroid.showWithGravity(
                "Não é possível transferir para você mesmo!",
                2000,
                ToastAndroid.CENTER
              );
            } else {
              alert("Não é possível transferir para você mesmo!");
            }
          }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSend(0);
    }
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
        <Text style={{ fontSize: 25 }}>PIX</Text>
        <View
          style={{
            width: "100%",
            padding: 30,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Text style={{ fontSize: 20 }}>Qual o valor da transferência?</Text>
          <ValorInput
            value={valor}
            mask="valor"
            inputMaskChange={(text: string) => {
              handleCustom(text);
            }}
            keyboardType="number-pad"
            placeholder="0,00"
          />
          <Text style={{ fontSize: 20 }}>Chave PIX</Text>
          <Input
            value={chave}
            onChangeText={(text: string) => {
              setChave(text);
            }}
            maxLength={50}
            keyboardType="number-pad"
            placeholder=""
          />
          
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {send == 0 && (
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              width: "83%",
              height: 40,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              transferir();
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
              Transferir
            </Text>
          </TouchableOpacity>
        )}
        {send == 1 && (
          <View
            style={{
              backgroundColor: "#000",
              width: "83%",
              height: 40,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}

          >
            <ActivityIndicator size={30} color="#fff" />
          </View>
        )}
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
