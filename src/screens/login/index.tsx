import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Input } from "react-native-elements";
import CheckBox from '@react-native-community/checkbox';

export interface HomeProps {}

export default function LoginScreen(props: HomeProps) {
  return (
    <ImageBackground
      source={require("../../../assets/img/Background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            style={styles.logo}
            source={require("../../../assets/img/BACKUP.png")}
          />
          <View style={{ flexDirection: "row", paddingLeft: 10 }}>
            <Text style={styles.text}>CPF</Text>
            <View style={{ flex: 1 }} />
          </View>

          <Input
            leftIcon={{ type: "font-awesome", name: "id-card" }}
            placeholder="000.000.000-00"
            style={styles.input}
          />

          <View style={{ flexDirection: "row", paddingLeft: 10 }}>
            <Text style={styles.text}>CPF</Text>
            <View style={{ flex: 1 }} />
          </View>

          <Input
            leftIcon={{ type: "font-awesome", name: "key" }}
            placeholder="******"
            style={styles.input}
          />

          <View style={styles.checkboxContainer}>
            <CheckBox style={styles.checkbox}/>
            <Text style={styles.label}> Lembrar CPF</Text>
          </View>
          

          <TouchableOpacity style={styles.button}>
            <ImageBackground
              source={require("../../../assets/img/button.png")}
              style={styles.backgroundButton}
            >
              <Text style={styles.text2}>Entrar</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
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
    paddingRight: 20,
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
    color: "#000",
    textAlign: "left",
    fontSize: 20,
  },
  text2: {
    color: "#fff",
    textAlign: "left",
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
    elevation: 24,
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
    height: 500,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 60,
    marginBottom: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
});
