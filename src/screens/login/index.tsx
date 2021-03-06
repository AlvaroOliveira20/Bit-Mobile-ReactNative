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

import "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface HomeProps {}

console.disableYellowBox = true;

export default function LoginScreen(props: HomeProps) {
  async function updateLembrar(){
    //@ts-ignore
    setLembrar(previousState => !previousState)
    let datal = !lembrar
    await AsyncStorage.setItem("lembrar", datal.toString())
  }
  React.useEffect(() => {
    (async () => {
      let lembrarCpf: any = await AsyncStorage.getItem("lembrar");

      if(lembrarCpf=="true"){
        setLembrar(true);
      }else if(lembrarCpf=="false"){
        setLembrar(false);
      }
      
      if (lembrarCpf=="true") {
        let cpfValue: any = await AsyncStorage.getItem("cpf");
        setCpf(cpfValue);
      }
    })();
  }, []);

  const nav = useNavigation();
  const logar = async (dados: any) => {
    if (dados.cpf.length < 14) {
      if (Platform.OS == "android") {
        ToastAndroid.showWithGravity(
          "CPF inválido!",
          2000,
          ToastAndroid.CENTER
        );
      } else {
        alert("CPF inválido!");
      }
    } else {
      let db = firebase.firestore();
      const snapshot = await db
        .collection("Users")
        .where("cpf", "==", dados.cpf)
        .get();

      let usuario = snapshot.empty ? null : snapshot.docs[0].data();
      let usuarioLogado = null;
      if (usuario != null) {
        try {
          usuarioLogado = await firebase
            .auth()
            .signInWithEmailAndPassword(usuario.email, dados.senha);
          await AsyncStorage.setItem("email", usuario.email);
          await AsyncStorage.setItem("senha", dados.senha);
          await AsyncStorage.setItem("cpf", dados.cpf);
        } catch (error:any) {
          console.error(error);
          if (
            error.message ==
            'signInWithEmailAndPassword failed: First argument "email" must be a valid string.'
          ) {
            error.message = "Erro, email não digitado!";
          } else if (
            error.message ==
            'signInWithEmailAndPassword failed: Second argument "password" must be a valid string.'
          ) {
            error.message = "Erro, senha não digitada!";
          } else if (
            error.message ==
            "There is no user record corresponding to this identifier. The user may have been deleted."
          ) {
            error.message = "Erro, cadastro não encontrado!";
          } else if (error.message == "The email address is badly formatted.") {
            error.message =
              "Erro, email não foi digitado corretamente, verifique e tente novamente!";
          } else if (
            error.message ==
            "The password is invalid or the user does not have a password."
          ) {
            error.message = "CPF ou senha incorretos!";
          } else if (
            error.message ==
            "A network error (such as timeout, interrupted connection or unreachable host) has occurred."
          ) {
            error.message =
              "Erro, não foi estabelecer uma conexão com a rede, verifique sua conexão e tente novamente!";
          }
          if (Platform.OS == "android") {
            ToastAndroid.showWithGravity(
              error.message,
              2000,
              ToastAndroid.CENTER
            );
          } else {
            alert(error.message);
          }
        }
        if (usuarioLogado) {
          await db
            .collection("Users")
            .doc(usuarioLogado.user?.uid)
            .get()
            .then((resultado) => {
              if (resultado.exists) {
                let dados = resultado.data();
                //@ts-ignore
                if (!dados.conta) {
                  nav.navigate("cadastro-cont");
                  //@ts-ignore
                } else if (dados.conta) {
                  nav.navigate("principal");
                }
              }
            });

          if (Platform.OS == "android") {
            ToastAndroid.showWithGravity(
              "Logado com sucesso!",
              2000,
              ToastAndroid.CENTER
            );
          } else {
            alert("Logado com sucesso!");
          }
        }
      } else {
        if (Platform.OS == "android") {
          ToastAndroid.showWithGravity(
            "CPF ou senha incorretos!",
            2000,
            ToastAndroid.CENTER
          );
        } else {
          alert("CPF ou senha incorretos!");
        }
      }
    }
  };
  const [cpf, setCpf] = React.useState("");
  const [lembrar, setLembrar]: any = React.useState(false);
  
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
          <TouchableOpacity onPress={() => nav.navigate('home')}>
            <Icon
              color={"#fff"}
              style={{ marginLeft: 15, marginRight: 15, marginTop: 25 }}
              size={40}
              type={"ionicons"}
              name={"arrow-back"}
            />
          </TouchableOpacity>
          <Text style={styles.text3}>Login</Text>
        </View>
      </HideWithKeyboard>

      <View style={styles.container}>
        <Formik
          initialValues={{ cpf: "", senha: "" }}
          validationSchema={Yup.object().shape({
            cpf: Yup.string().required("O campo 'CPF' é obrigatório!"),
            senha: Yup.string().required("O campo 'Senha' é obrigatório!"),
          })}
          onSubmit={logar}
        >
          {({
            errors,
            setFieldValue,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            handleBlur,
          }) => (
            <View style={styles.card}>
              <HideWithKeyboard>
                <Image
                  style={styles.logo}
                  source={require("../../../assets/img/BACKUP.png")}
                />
              </HideWithKeyboard>
              <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                <Text style={styles.text}>CPF</Text>
                <View style={{ flex: 1 }} />
              </View>

              <CpfInput
                onBlur={handleBlur("cpf")}
                value={cpf}
                mask="cpf"
                maxLength={14}
                inputMaskChange={(text: string) => {
                  setFieldValue("cpf", text);
                  handleCustom(text);
                }}
                keyboardType="number-pad"
                placeholder="000.000.000-00"
                style={styles.input}
              />
              {touched.cpf && (
                <Text
                  style={{ color: "#f00", fontSize: 13, textAlign: "right" }}
                >
                  {errors.cpf}
                </Text>
              )}

              <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                <Text style={styles.text}>Senha</Text>
                <View style={{ flex: 1 }} />
              </View>

              <Input
                onBlur={handleBlur("senha")}
                keyboardType="number-pad"
                onChangeText={handleChange("senha")}
                secureTextEntry
                leftIcon={{ type: "font-awesome", name: "key" }}
                placeholder="********"
                style={styles.input}
              />

              {touched.senha && (
                <Text
                  style={{ color: "#f00", fontSize: 13, textAlign: "right" }}
                >
                  {errors.senha}
                </Text>
              )}
              <View style={styles.checkboxContainer}>
                <CheckBox
                  onValueChange={updateLembrar}
                  
                  value={lembrar}
                  style={styles.checkbox}
                />
                <Text style={styles.label}> Lembrar CPF</Text>
              </View>

              {isSubmitting && (
                <View style={styles.button}>
                  <ImageBackground
                    imageStyle={{ borderRadius: 8 }}
                    source={require("../../../assets/img/button.png")}
                    style={styles.backgroundButton}
                  >
                    <ActivityIndicator size={30} color="#fff" />
                  </ImageBackground>
                </View>
              )}

              {!isSubmitting && (
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={styles.button}
                >
                  <ImageBackground
                    imageStyle={{ borderRadius: 8 }}
                    source={require("../../../assets/img/button.png")}
                    style={styles.backgroundButton}
                  >
                    <Text style={styles.text2}>Entrar</Text>
                  </ImageBackground>
                </TouchableOpacity>
              )}
            </View>
          )}
        </Formik>
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
