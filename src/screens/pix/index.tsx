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
import QRCode from "react-native-qrcode-svg";
import { Icon } from "react-native-elements";
import firebase from "firebase";
import { AlertCustom } from "./components/alert";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export interface PixProps {}

export default function PixScreen(props: PixProps) {
  const [qr, setQr] = React.useState(null);
  const [visibilidade, setVisibilidade] = React.useState(false);
  const nav = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <AlertCustom
        titulo="Teste"
        visivel={visibilidade}
        onCancelar={() => {
          setVisibilidade(false);
        }}
        onCompleted={() => {
          setVisibilidade(false);
        }}
      />
      {!qr && (
        <View style={{ flex: 1 }}>
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
            <Image
              source={require("../../../assets/pix_b.png")}
              style={{ width: 150, height: 150 }}
            />
            <Text style={{ fontSize: 25 }}>Meu PIX</Text>
            <View style={{ width: "100%", paddingLeft: 30 }}>
              <Text style={{ fontSize: 20 }}>Transações imediatas,</Text>
              <Text style={{ fontSize: 20 }}>tudo na palma da sua mão.</Text>
            </View>
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 130,
                  height: 140,

                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => {
                  nav.navigate("qrcode");
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
                  <Icon
                    color={"#000"}
                    style={{}}
                    size={50}
                    type={"font-awesome"}
                    name={"qrcode"}
                  />
                </View>

                <Text style={{ fontSize: 20, textAlign: "center" }}>Pagar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 130,
                  height: 140,

                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => nav.navigate("transferencia-pix")}
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
                  <Icon
                    color={"#000"}
                    style={{}}
                    size={50}
                    type={"font-awesome"}
                    name={"exchange"}
                  />
                </View>

                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  Transferir
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 130,
                  height: 140,

                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => {
                  setVisibilidade(true)
                  
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
                  <Icon
                    color={"#000"}
                    style={{}}
                    size={50}
                    type={"font-awesome"}
                    name={"money"}
                  />
                </View>

                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  Cobrar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 130,
                  height: 140,

                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => nav.navigate("chaves")}
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

                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  Minhas chaves
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {qr && <QRCode value="http://awesome.link.qr" />}
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
