import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Animated,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableHighlight,
  TouchableNativeFeedback,
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
import { CpfInput } from "./../../components/input";
import { AlertCustom } from "./../../components/alert-custom";
import { Dimensions } from "react-native";
import { ExpandingDot } from "react-native-animated-pagination-dots";

export interface CartaoVirtualProps {}

export default function CartaoVirtualScreen(props: CartaoVirtualProps) {
  const SLIDER_DATA = [
    {
      key: null,
    },
    {
      key: null,
    },
  ];
  const nav = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const width90 = windowWidth * 0.9;
  const [visibilidade, setVisibilidade] = React.useState(false);
  const scrollX = React.useRef(new Animated.Value(0)).current;

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
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Image
          source={require("../../../assets/card.png")}
          style={{ width: "90%", height: 200 }}
        />
        <View style={{ width: "100%", padding: "10%" }}>
          <Text style={{ fontSize: 15, color: "#777" }}>Nome do titular:</Text>
          <Text style={{ fontSize: 25 }}>Fulano da Silva</Text>
        </View>
        <View style={{ width: "100%", flexDirection: 'row', padding: "10%", alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{  }}>
            <Text style={{ fontSize: 15, color: "#777" }}>Validade:</Text>
            <Text style={{ fontSize: 25 }}>01/2024</Text>
          </View>
          <View style={{ }}>
            <Text style={{ fontSize: 15, color: "#777" }}>CVV:</Text>
            <Text style={{ fontSize: 25 }}>123</Text>
          </View>
        </View>
      </View>
      <View
        style={{ flex: 0.7, alignItems: "center", justifyContent: "center" ,}}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            width: 200,
            height: 40,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            Apagar cartão
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            marginTop:25,
            width: 200,
            height: 40,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            Bloquear cartão
          </Text>
        </TouchableOpacity>
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
