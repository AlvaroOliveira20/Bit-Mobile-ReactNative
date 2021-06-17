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
import firebase from "firebase";
import "firebase/firestore";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export interface BloqueioProps {}

export default function BloqueioScreen(props: BloqueioProps) {
  const nav = useNavigation();
  const [Nacional, setNacional] = React.useState(["lock-open", "#ddd"]);
  const [internacional, setInternacional] = React.useState([
    "lock-open",
    "#ddd",
  ]);
  const [fisico, setFisico] = React.useState(["lock-open", "#ddd"]);
  const [online, setOnline] = React.useState(["lock-open", "#ddd"]);
  const [total, setTotal] = React.useState(["lock-open", "#ddd"]);
  const [proximidade, setProximidade] = React.useState(["lock-open", "#ddd"]);

  useEffect(() => {
    let db = firebase.firestore();
    const user = firebase.auth().currentUser;
    db.collection("Users")

      .doc(user?.uid)
      .get()
      .then((resultado) => {
        let dados = resultado.data();
        //@ts-ignore
        if (dados.bloqFisico) {
          setFisico(["lock-closed", "#f00"]);
        } else {
          setFisico(["lock-open", "#ddd"]);
        }

        if (dados.bloqInternacional) {
          setInternacional(["lock-closed", "#f00"]);
        } else {
          setInternacional(["lock-open", "#ddd"]);
        }

        if (dados.bloqNacional) {
          setNacional(["lock-closed", "#f00"]);
        } else {
          setNacional(["lock-open", "#ddd"]);
        }

        if (dados.bloqOnline) {
          setOnline(["lock-closed", "#f00"]);
        } else {
          setOnline(["lock-open", "#ddd"]);
        }

        if (dados.bloqProximidade) {
          setProximidade(["lock-closed", "#f00"]);
        } else {
          setProximidade(["lock-open", "#ddd"]);
        }

        if (dados.bloqTotal) {
          setTotal(["lock-closed", "#f00"]);
        } else {
          setTotal(["lock-open", "#ddd"]);
        }
      });
  }, []);

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
        style={{ flex: 0.4, alignItems: "center", justifyContent: "center" }}
      >
        <Text
          style={{
            color: "#000",
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          Bloqueio do cartão
        </Text>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {total[0] == "lock-open" && (
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (Nacional[0] == "lock-open") {
                  setNacional(["lock-closed", "#F00"]);
                  let db = firebase.firestore();
                  const user = firebase.auth().currentUser;
                  //@ts-ignore
                  let uid = user.uid;

                  db.collection("Users").doc(uid).update({
                    bloqNacional: true,
                  });
                } else {
                  setNacional(["lock-open", "#DDD"]);
                  let db = firebase.firestore();
                  const user = firebase.auth().currentUser;
                  //@ts-ignore
                  let uid = user.uid;

                  db.collection("Users").doc(uid).update({
                    bloqNacional: false,
                  });
                }
              }}
              style={{
                width: 130,
                height: 140,

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: Nacional[1],
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  color={"#000"}
                  style={{}}
                  size={50}
                  type={"ionicon"}
                  name={Nacional[0]}
                />
              </View>

              <Text style={{ fontSize: 20, textAlign: "center" }}>
                Compras nacionais
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (internacional[0] == "lock-open") {
                  setInternacional(["lock-closed", "#F00"]);
                  let db = firebase.firestore();
                  const user = firebase.auth().currentUser;
                  //@ts-ignore
                  let uid = user.uid;

                  db.collection("Users").doc(uid).update({
                    bloqInternacional: true,
                  });
                } else {
                  setInternacional(["lock-open", "#DDD"]);
                  let db = firebase.firestore();
                  const user = firebase.auth().currentUser;
                  //@ts-ignore
                  let uid = user.uid;

                  db.collection("Users").doc(uid).update({
                    bloqInternacional: false,
                  });
                }
              }}
              style={{
                width: 130,
                height: 140,

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: internacional[1],
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  color={"#000"}
                  style={{}}
                  size={50}
                  type={"ionicon"}
                  name={internacional[0]}
                />
              </View>

              <Text style={{ fontSize: 20, textAlign: "center" }}>
                Compras internacionais
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {total[0] == "lock-closed" && (
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 130,
                height: 140,

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "#555",
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  color={"#000"}
                  style={{}}
                  size={50}
                  type={"ionicon"}
                  name={Nacional[0]}
                />
              </View>

              <Text style={{ fontSize: 20, textAlign: "center" }}>
                Compras nacionais
              </Text>
            </View>
            <View
              style={{
                width: 130,
                height: 140,

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "#555",
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  color={"#000"}
                  style={{}}
                  size={50}
                  type={"ionicon"}
                  name={internacional[0]}
                />
              </View>

              <Text style={{ fontSize: 20, textAlign: "center" }}>
                Compras internacionais
              </Text>
            </View>
          </View>
        )}
        {total[0] == "lock-open" && (
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (fisico[0] == "lock-open") {
                  setFisico(["lock-closed", "#F00"]);
                  let db = firebase.firestore();
                  const user = firebase.auth().currentUser;
                  //@ts-ignore
                  let uid = user.uid;

                  db.collection("Users").doc(uid).update({
                    bloqFisico: true,
                  });
                } else {
                  setFisico(["lock-open", "#DDD"]);
                  let db = firebase.firestore();
                  const user = firebase.auth().currentUser;
                  //@ts-ignore
                  let uid = user.uid;

                  db.collection("Users").doc(uid).update({
                    bloqFisico: false,
                  });
                }
              }}
              style={{
                width: 130,
                height: 140,

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: fisico[1],
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  color={"#000"}
                  style={{}}
                  size={50}
                  type={"ionicon"}
                  name={fisico[0]}
                />
              </View>

              <Text style={{ fontSize: 20, textAlign: "center" }}>
                Compras físicas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (online[0] == "lock-open") {
                  setOnline(["lock-closed", "#F00"]);
                  let db = firebase.firestore();
                  const user = firebase.auth().currentUser;
                  //@ts-ignore
                  let uid = user.uid;

                  db.collection("Users").doc(uid).update({
                    bloqOnline: true,
                  });
                } else {
                  setOnline(["lock-open", "#DDD"]);
                  let db = firebase.firestore();
                  const user = firebase.auth().currentUser;
                  //@ts-ignore
                  let uid = user.uid;

                  db.collection("Users").doc(uid).update({
                    bloqOnline: false,
                  });
                }
              }}
              style={{
                width: 130,
                height: 140,

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: online[1],
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  color={"#000"}
                  style={{}}
                  size={50}
                  type={"ionicon"}
                  name={online[0]}
                />
              </View>

              <Text style={{ fontSize: 20, textAlign: "center" }}>
                Compras online
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {total[0] == "lock-closed" && (
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <View
              
              style={{
                width: 130,
                height: 140,

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "#555",
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  color={"#000"}
                  style={{}}
                  size={50}
                  type={"ionicon"}
                  name={fisico[0]}
                />
              </View>

              <Text style={{ fontSize: 20, textAlign: "center" }}>
                Compras físicas
              </Text>
            </View>
            <View
              
              style={{
                width: 130,
                height: 140,

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "#555",
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  color={"#000"}
                  style={{}}
                  size={50}
                  type={"ionicon"}
                  name={online[0]}
                />
              </View>

              <Text style={{ fontSize: 20, textAlign: "center" }}>
                Compras online
              </Text>
            </View>
          </View>
        )}
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (total[0] == "lock-open") {
                setTotal(["lock-closed", "#F00"]);
                let db = firebase.firestore();
                const user = firebase.auth().currentUser;
                //@ts-ignore
                let uid = user.uid;

                db.collection("Users").doc(uid).update({
                  bloqTotal: true,
                });
              } else {
                setTotal(["lock-open", "#DDD"]);
                let db = firebase.firestore();
                const user = firebase.auth().currentUser;
                //@ts-ignore
                let uid = user.uid;

                db.collection("Users").doc(uid).update({
                  bloqTotal: false,
                });
              }
            }}
            style={{
              width: 130,
              height: 140,

              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: total[1],
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                color={"#000"}
                style={{}}
                size={50}
                type={"ionicon"}
                name={total[0]}
              />
            </View>

            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Bloqueio total
            </Text>
          </TouchableOpacity>
          {total[0] == "lock-open" && (
          <TouchableOpacity
            onPress={() => {
              if (proximidade[0] == "lock-open") {
                setProximidade(["lock-closed", "#F00"]);
                let db = firebase.firestore();
                const user = firebase.auth().currentUser;
                //@ts-ignore
                let uid = user.uid;

                db.collection("Users").doc(uid).update({
                  bloqProximidade: true,
                });
              } else {
                setProximidade(["lock-open", "#DDD"]);
                let db = firebase.firestore();
                const user = firebase.auth().currentUser;
                //@ts-ignore
                let uid = user.uid;

                db.collection("Users").doc(uid).update({
                  bloqProximidade: false,
                });
              }
            }}
            style={{
              width: 130,
              height: 140,

              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: proximidade[1],
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                color={"#000"}
                style={{}}
                size={50}
                type={"ionicon"}
                name={proximidade[0]}
              />
            </View>

            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Aproximação
            </Text>
          </TouchableOpacity>
          )}
          {total[0] == "lock-closed" && (
          <View
           
            style={{
              width: 130,
              height: 140,

              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: "#555",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                color={"#000"}
                style={{}}
                size={50}
                type={"ionicon"}
                name={proximidade[0]}
              />
            </View>

            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Aproximação
            </Text>
          </View>
          )}
        </View>
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
