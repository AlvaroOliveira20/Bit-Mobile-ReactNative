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
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Input, Icon } from "react-native-elements";
import CheckBox from "@react-native-community/checkbox";
import { Header } from "react-native/Libraries/NewAppScreen";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import { Formik } from "formik";
import * as Yup from "yup";
import { CpfInput } from "./../../components/input";
import firebase from "firebase";
import * as LocalAuthentication from "expo-local-authentication";
import { Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import "firebase/firestore";

export interface ConfiguracoesProps {}

console.disableYellowBox = true;

export default function ConfiguracoesScreen(props: ConfiguracoesProps) {
  const [visibilidade, setVisibilidade] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      let biometria: any = await AsyncStorage.getItem("biometria");
      if (biometria=="true"){
        setIsEnabled(true)
      }else{
        setIsEnabled(false)
      }
      
      LocalAuthentication.hasHardwareAsync().then((result: any) => {
        if (result == true) {
          setVisibilidade(true);
        }
      });
    })();
  }, []);
  const nav = useNavigation();
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = async (value: any) => {
    console.log(value);

    try {
      await AsyncStorage.setItem("biometria", value.toString());
      setIsEnabled(value);
    } catch (e) {
      console.error(e);
    }
  };

  const logar = async (dados: any) => {
    // LocalAuthentication.hasHardwareAsync().then((result) => {
    //   console.log(result)
    // })
    // LocalAuthentication.supportedAuthenticationTypesAsync().then((result) => {
    //   console.log(result)
    // })
    // LocalAuthentication.isEnrolledAsync().then((result) => {
    //   console.log(result)
    // })
    // let options = {
    //   "promptMessage": "Use a biometria para autenticar."
    // }
    // LocalAuthentication.authenticateAsync(options)
    // .then((result) => {
    //   console.log(result)
    // })
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

      <HideWithKeyboard style={{ flex: 1 }}>
        <View
          style={{
            borderBottomColor: "#005a55",
            borderBottomWidth: 1,
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#007d77",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => nav.goBack()}>
            <Icon
              color={"#fff"}
              style={{ marginLeft: 15, marginRight: 15, marginTop: 25 }}
              size={40}
              type={"ionicons"}
              name={"arrow-back"}
            />
          </TouchableOpacity>
          <Text style={styles.text3}>Configurações</Text>
        </View>
      </HideWithKeyboard>

      <View style={styles.container}>
        {visibilidade && (
          <View style={styles.card}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View style={{}}>
                <Text style={[styles.text, { fontSize: 20 }]}>Biometria</Text>
                <Text style={[styles.text, { fontSize: 14, width: 220, color: "#666" }]}>
                  Utilize a biometria ao invés de CPF e senha.
                </Text>
              </View>

              <Switch
                trackColor={{ false: "#aaa", true: "#0eb" }}
                thumbColor={isEnabled ? "#fff" : "#fff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => {
                  toggleSwitch(value);
                }}
                value={isEnabled}
              />
            </View>
          </View>
        )}
        {!visibilidade && (
          <View style={styles.card}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View style={{}}>
                <Text style={[styles.text, { fontSize: 20, color: "#777" }]}>
                  Biometria
                </Text>
                <Text
                  style={[
                    styles.text,
                    { fontSize: 14, width: 220, color: "#999" },
                  ]}
                >
                  Utilize a biometria ao invés de CPF e senha.
                </Text>
              </View>

              <Switch
                trackColor={{ false: "#aaa", true: "#0eb" }}
                thumbColor={isEnabled ? "#ddd" : "#ddd"}
                ios_backgroundColor="#3e3e3e"
                disabled={true}
              />
            </View>
            <Text style={[styles.text, { fontSize: 12, color: "#f00" }]}>
              Seu dispositivo não é compatível com biometria.
            </Text>
          </View>
        )}
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
    flex: 9,
    padding: 0,
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
    marginLeft: 15,
    marginTop: 24,
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
    width: 350,

    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
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
