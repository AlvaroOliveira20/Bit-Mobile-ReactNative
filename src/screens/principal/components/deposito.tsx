import * as React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Modal } from "react-native";
import { Icon } from "react-native-elements";
import { Picker } from "react-native";
import { Input } from "react-native-elements";
import firebase from "firebase";
import "firebase/firestore";
import QRCode from "react-native-qrcode-svg";
import { Image } from "react-native";

export interface AlertCobrarProps {
  titulo?: string;
  visivel: boolean;
  onCancelar(): void;
  children?: any;
  onCompleted(): void;
}
export function AlertCobrar(props: AlertCobrarProps) {
  const [selectedValue, setSelectedValue] = React.useState("CPF");
  const [valor, setValor] = React.useState();
  const [send, setSend] = React.useState(0);
  const [qr, setQr] = React.useState(null);

  const gravar = async () => {
    if (valor) {
      let db = firebase.firestore();
      const user = firebase.auth().currentUser;
      db.collection("Users")
        .doc(user?.uid)
        .get()
        .then((resultado) => {
          let dados = resultado.data();
          setQr(dados.conta.toString() + valor);
        });
    } else {
      alert("valor não pode ser nulo!");
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
              onPress={() => {
                setQr(null);
                setValor(null);
                props.onCancelar();
              }}
              color={"#aaa"}
              style={{}}
              size={40}
              name={"close"}
            />
          </View>
          {!qr && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  padding: 10,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20 }}>Valor a depositar</Text>
                <Input
                  value={valor}
                  onChangeText={(text: string) => {
                    setValor(text);
                  }}
                  maxLength={50}
                  keyboardType="number-pad"
                  placeholder=""
                />
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
                    Gerar boleto
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
          )}
          {qr && (
            <View style={{alignItems:'center'}}>
              <Image
                style={{ width: "100%", height: 200 }}
                source={require("../../../../assets/boleto.png")}
              />

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
                  props.onCompleted()
                  setQr(null)
                  setValor(null)
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                >
                  Salvar boleto
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
