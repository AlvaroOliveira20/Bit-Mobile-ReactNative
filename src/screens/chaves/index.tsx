import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import Chave from "./../../models/chave";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Platform, Button } from "react-native";
import { AndroidNotificationPriority } from "expo-notifications";
import AnimatedFlatlist from "react-native-animated-flatlist";
import uuid from "react-native-uuid";
import firebase from "firebase";
import { AlertCustom } from "./components/alert";
import { IconObject } from "react-native-elements/dist/icons/Icon";
import "firebase/firestore";

export interface ChavesProps {}

export default function ChavesScreen(props: ChavesProps) {
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [visibilidade, setVisibilidade] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);

  useEffect(() => {
    let db = firebase.firestore();
    const user = firebase.auth().currentUser;
    db.collection("Users")
      .doc(user?.uid)
      .get()
      .then((resultado) => {
        let dados = resultado.data();
        //@ts-ignore
        if (dados.chave) {
          //@ts-ignore
          setChaves((oldArray) => [
            ...oldArray,
            new Chave(dados.tipoChave, dados.chave),
          ]);
        }
      });
  }, []);

  const nav = useNavigation();
  function navToLogin() {
    nav.navigate("login");
  }
  function navToCadastro() {
    nav.navigate("cadastro");
  }
  const [chaves, setChaves]: any = React.useState([]);
  const zoomOut = {
    0: {
      backgroundColor: "#0f0",
      opacity: 0,
      scale: 0,
    },
    0.5: {
      backgroundColor: "#0f0",
      opacity: 0.5,
      scale: 0,
    },
    1: {
      backgroundColor: "#0f0",
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <AlertCustom
        titulo="Teste"
        visivel={visibilidade}
        onCancelar={() => {
          setVisibilidade(false);
        }}
        onCompleted={() => {
          let db = firebase.firestore();
          setVisibilidade(false);
          const user = firebase.auth().currentUser;
          db.collection("Users")
            .doc(user?.uid)
            .get()
            .then((resultado) => {
              let dados = resultado.data();
              //@ts-ignore
              if (dados.chave) {
                //@ts-ignore
                setChaves((oldArray) => [
                  new Chave(dados.tipoChave, dados.chave),
                ]);
              }
            });
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Icon
            color={"#000"}
            style={{ marginLeft: 10 }}
            size={40}
            type={"ionicon"}
            name={"chevron-back"}
          />
        </TouchableOpacity>

        <Text style={{ fontSize: 15 }}>Minhas chaves PIX</Text>

        <TouchableOpacity>
          <Icon
            color={"#000"}
            style={{ marginRight: 15 }}
            size={40}
            type={"ionicons"}
            name={"add"}
            onPress={() => {
              setVisibilidade(true);
              console.log(visibilidade);
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{}}>
        <SafeAreaView style={[styles.background, {}]}>
          <StatusBar style="dark" />
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View
              style={{
                flex: 1,
                padding: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "#ddd",
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/pix_b.png")}
                  style={{ width: 50, height: 50 }}
                />
              </View>
              <Text
                style={{ color: "#000", fontWeight: "bold", marginTop: 25 }}
              >
                Chaves
              </Text>
            </View>
          </View>

          <View>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#ddd",
                  padding: 1,
                  marginBottom: 10,
                }}
              />
              <Text>Chaves</Text>
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#ddd",
                  padding: 1,
                  marginTop: 10,
                }}
              />
            </View>
            {chaves.length < 1 && <Text>Não há chaves cadastradas</Text>}
            {chaves.length > 0 && (
              <FlatList
                scrollEnabled={false}
                data={chaves}
                renderItem={(data) => (
                  <View>
                    <View
                      style={{
                        borderColor: "#000",
                        padding: 10,
                        borderWidth: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text>{data.item.tipo}</Text>
                      <Text>{data.item.chave}</Text>
                      <Icon
                        name="delete"
                        onPress={() => {
                          const FieldValue = firebase.firestore.FieldValue;
                          let db = firebase.firestore();
                          const user =  firebase.auth().currentUser;
                          //@ts-ignore
                          let uid = user.uid;

                          db.collection("Users").doc(uid).update({
                            chave: FieldValue.delete(),
                            tipoChave: FieldValue.delete()
                          })
                          
                        }}
                      ></Icon>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
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
