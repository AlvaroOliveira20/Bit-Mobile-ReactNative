import * as React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Modal } from "react-native";
import { Icon } from "react-native-elements";
import { Picker } from "react-native";
import { Input } from "react-native-elements";
import firebase from "firebase";
import "firebase/firestore";
import { Updates } from "expo";

export interface AlertCustomProps {
  titulo?: string;
  visivel: boolean;
  onCancelar(): void;
  children?: any;
  onCompleted(): void;
}
export function AlertCustom(props: AlertCustomProps) {
  const [selectedValue, setSelectedValue]: any = React.useState("Selecione");
  const [chave, setChave]: any = React.useState();
  const [send, setSend] = React.useState(0);

  const gravar = async () => {
    setSend(1);
    console.log(selectedValue)
    if (selectedValue != "Selecione") {
      if (chave != null) {
        try {
          let db = firebase.firestore();
          const user = await firebase.auth().currentUser;
          //@ts-ignore
          let uid = user.uid;

          await db.collection("Users").doc(uid).update({
            chave: chave,
            tipoChave: selectedValue,
          });
          setChave(null);
          props.onCompleted();
        } catch (e) {
        } finally {
          setSend(0);
        }
      } else {
        alert("a chave não pode ser nula");
        setSend(0);
      }
    } else {
      alert("Selecione um tipo de chave");

      setSend(0);
    }
  };
  return (
    <Modal visible={props.visivel} animationType="slide" transparent>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "#fff",
            width: "80%",
            height: "40%",
            padding: 10,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 20,
              height: 12,
            },
            shadowOpacity: 1,
            shadowRadius: 10.0,
            elevation: 50,
            borderColor: "#156e65",
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "flex-end",
              marginRight: 10,
              marginTop: 10,
            }}
          >
            <Icon
              onPress={props.onCancelar}
              color={"#aaa"}
              style={{}}
              size={40}
              name={"close"}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Text style={{ marginRight: 5, fontSize: 20 }}>
                Tipo de chave:
              </Text>
              <View style={{ borderWidth: 1, borderColor: "#000" }}>
                <Picker
                  selectedValue={selectedValue}
                  style={{ height: 30, width: 150 }}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(itemValue);
                    if (itemValue == "CPF") {
                      let db = firebase.firestore();
                      const user = firebase.auth().currentUser;
                      db.collection("Users")

                        .doc(user?.uid)
                        .get()
                        .then((resultado) => {
                          let dados = resultado.data();
                          //@ts-ignore
                          setChave(dados.cpf);
                        });
                    } else if (itemValue == "Chave Aleatória") {
                      let rand: any = Math.floor(Math.random() * (5 - 0)) + 0;
                      if (rand == 0) setChave("782c9979015c2782c2ba");
                      if (rand == 1) setChave("2ba782c997e2782c9015");
                      if (rand == 2) setChave("07195c2782c2fa782ce9");
                      if (rand == 3) setChave("c1853b1cd351d2a74923");
                      if (rand == 4) setChave("c2453dc10251d2a74654");
                      if (rand == 5) setChave("1d865b1cd353e4f53458");
                    } else {
                      setChave(null);
                    }
                  }}
                >
                  <Picker.Item label="Selecione" value="Selecione" />
                  <Picker.Item
                    label="Chave Aleatória"
                    value="Chave Aleatória"
                  />
                  <Picker.Item label="CPF" value="CPF" />
                </Picker>
              </View>
            </View>
            <View
              style={{
                padding: 10,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>Chave PIX</Text>
              <Text style={{ fontSize: 22 }}>{chave}</Text>
            </View>
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
                  gravar();
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                >
                  Salvar
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
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    //backgroundColor:'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
