import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface HomeProps {}

export default function HomeFuncaoScreen(props: HomeProps) {
  const nav = useNavigation();
  function navToLogin() {
    nav.navigate("login");
  }
  function navToCadastro() {
    nav.navigate("cadastro");
  }
  function navToCartao() {
    nav.navigate("cartao");
  }
  return (
    <ImageBackground
      source={require("../../../assets/img/Background.png")}
      style={styles.background}
    >
      <StatusBar style="light" backgroundColor="#000" />
      <View style={styles.container2}>
        <View style={styles.div}>
          <Image
            style={styles.logo}
            source={require("../../../assets/img/BACKUP.png")}
          />
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navToLogin()} style={styles.button}>
          <ImageBackground
            imageStyle={{ borderRadius: 8 }}
            source={require("../../../assets/img/button.png")}
            style={styles.backgroundButton}
          >
            <Text style={styles.text}>Entrar</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navToCadastro()} style={styles.button}>
          <ImageBackground
            imageStyle={{ borderRadius: 8 }}
            source={require("../../../assets/img/button.png")}
            style={styles.backgroundButton}
          >
            <Text style={styles.text}>Criar BitConta</Text>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.div}>
          <Image
            style={styles.logo2}
            source={require("../../../assets/img/card.png")}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { width: "100%", height: "100%" },
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
