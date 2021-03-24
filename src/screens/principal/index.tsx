import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Input, Icon } from "react-native-elements";
import CheckBox from "@react-native-community/checkbox";
import { Header } from "react-native/Libraries/NewAppScreen";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import { Formik } from "formik";
import * as Yup from "yup";
import CpfInput from "./../../components/input";

export interface PrincipalProps {}

export default function PrincipalScreen(props: PrincipalProps) {
  const nav = useNavigation();

  const cadastrar = async (dados: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (Platform.OS == "android") {
      ToastAndroid.showWithGravity(
        "Cadastrado com sucesso!",
        2000,
        ToastAndroid.CENTER
      );
    } else {
      alert("Cadastrado com sucesso!");
    }
  };
  const [cpf, setCpf] = React.useState("");
  function handleCustom(value: string) {
    setCpf(value);
  }
  return (
    <ImageBackground
      source={require("../../../assets/img/Background.png")}
      style={styles.background}
    >
      <StatusBar style="light" backgroundColor="#000" />

      <View style={styles.container2}>
        <Image
          source={require("../../../assets/img/img_avatar.png")}
          style={{ borderRadius: 100, width: 100, height: 100 }}
        />
        <Text style={styles.text3}>Olá, Nome!</Text>
        <View style={styles.card}>
          <View
            style={{
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Icon size={50} type="font-awesome" name="credit-card" />
            <Text style={styles.text}>CARTÃO DE CRÉDITO</Text>
          </View>
          <View
            style={{
              marginTop: 25,
              flex: 3,
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Text style={styles.text}>FATURA ATUAL:</Text>
            <Text style={{ color: "#000", fontSize: 45, fontWeight: "bold" }}>
              R$0,00
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Limite disponível: R$600,00</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            nav.goBack();
            if (Platform.OS == "android") {
              ToastAndroid.showWithGravity(
                "Deslogado!",
                2000,
                ToastAndroid.CENTER
              );
            } else {
              alert("Deslogado!");
            }
          }}
        >
          <ImageBackground
            imageStyle={{ borderRadius: 8 }}
            source={require("../../../assets/img/button.png")}
            style={styles.backgroundButton}
          >
            <Text style={styles.text2}>Sair</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <ScrollView style={{}} horizontal>
          <TouchableOpacity>
            <View style={{ marginLeft: 15 }}>
              <View style={styles.card2}>
                <View style={{ flex: 9 }}>
                  <Icon
                    style={{ marginTop: 10 }}
                    size={60}
                    type="font-awesome"
                    name="money"
                    color="white"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}
                  >
                    Pagamentos
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.card2}>
              <View style={{ flex: 9, alignItems: "center" }}>
                <Image
                  source={require("../../../assets/pix.png")}
                  style={{ width: 70, height: 70 }}
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}
                >
                  PIX
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.card2}>
              <View style={{ flex: 9, alignItems: "center" }}>
                <Icon
                  style={{ marginTop: 10 }}
                  size={60}
                  type="font-awesome"
                  name="exchange"
                  color="white"
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}
                >
                  Transferir
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.card2}>
              <View style={{ flex: 9, alignItems: "center" }}>
                <Icon
                  style={{ marginTop: 10 }}
                  size={60}
                  type="font-awesome"
                  name="sliders"
                  color="white"
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    width: 100,
                    fontWeight: "bold",
                  }}
                >
                  Ajustar Limite
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.card2}>
              <View style={{ flex: 9, alignItems: "center" }}>
                <Icon
                  style={{ marginTop: 10 }}
                  size={60}
                  type="font-awesome"
                  name="lock"
                  color="white"
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    width: 130,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Bloqueio de catão
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.card2}>
              <View style={{ flex: 9, alignItems: "center" }}>
                <Icon
                  style={{ marginTop: 10 }}
                  size={60}
                  type="font-awesome"
                  name="credit-card"
                  color="white"
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    width: 130,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Cartão virtual
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.card2}>
              <View style={{ flex: 9, alignItems: "center" }}>
                <Icon
                  style={{ marginTop: 10 }}
                  size={60}
                  type="font-awesome"
                  name="user-plus"
                  color="white"
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    width: 130,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Convidar amigos
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.card2}>
              <View style={{ flex: 9, alignItems: "center" }}>
                <Icon
                  style={{ marginTop: 10 }}
                  size={60}
                  type="font-awesome"
                  name="question"
                  color="white"
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    width: 130,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Ajuda
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.card2}>
              <View style={{ flex: 9, alignItems: "center" }}>
                <Icon
                  style={{ marginTop: 10 }}
                  size={60}
                  type="font-awesome"
                  name="barcode"
                  color="white"
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    width: 130,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Pagar
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ marginRight: 15 }}>
              <View style={styles.card2}>
                <View style={{ flex: 9, alignItems: "center" }}>
                  <Icon
                    style={{ marginTop: 10 }}
                    size={60}
                    type="font-awesome"
                    name="arrow-circle-down"
                    color="white"
                  />
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 15,
                      width: 130,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Depositar
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  label2: {
    margin: 8,
    color: "#00f",
  },
  background: { width: "100%", height: "100%" },
  backgroundButton: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 23,
  },
  container: {
    marginBottom: 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    color: "#000",
    textAlign: "left",
    fontSize: 20,
  },
  text2: {
    color: "#fff",
    textAlign: "left",
    fontSize: 20,
  },
  text3: {
    color: "#fff",
    textAlign: "left",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
  },
  button: {
    borderRadius: 10,
    margin: 0,
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
    flex: 3,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 30,
  },
  div: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    marginTop: 0,
    display: "flex",
    justifyContent: "center",
    width: 200,
    height: 100,
  },
  logo2: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: 200,
  },
  card: {
    marginTop: 15,
    width: "95%",
    height: "60%",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
    marginBottom: 15,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 10.0,
    elevation: 10,
  },
  card2: {
    marginTop: 15,
    width: 150,
    height: 150,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: "#10615d",
    borderRadius: 10,
    marginBottom: 50,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 10.0,
    elevation: 10,
  },
});
