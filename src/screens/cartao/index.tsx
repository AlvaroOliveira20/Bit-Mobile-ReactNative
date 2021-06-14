import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import { ItemTransacao } from "./components";
import Transacao from "./../../models/transacao";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Platform, Button } from "react-native";
import { AndroidNotificationPriority } from "expo-notifications";
import AnimatedFlatlist from "react-native-animated-flatlist";
import uuid from "react-native-uuid";

export interface CartaoProps {}

export default function CartaoScreen(props: CartaoProps) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [exibir, setExibir] = useState(false);
  const [sec, setSec] = React.useState(5);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      //@ts-ignore
      setExpoPushToken(token)
    );
    //@ts-ignore
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        //@ts-ignore
        setNotification(notification);
      }
    );
    //@ts-ignore
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        //console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        //@ts-ignore
        notificationListener.current
      );
      //@ts-ignore
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(() => {
    async function func() {
      if (exibir) {
        if (sec > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setSec(sec - 1);
        } else {
          setExibir(false);
        }
      }
    }
    func();
  });

  async function schedulePushNotification() {
    let random = Math.floor(Math.random() * 3)
    //console.log(random)
    let loja = "0"
    let valor = "0";
    if (random == 0) {
      valor = "R$ 10,00";
      loja = "Mercpago *Uber"
      setTransacoes((transacoes) => [
        new Transacao(
          "local-taxi",
          "transporte",
          loja,
          "01/01/2021",
          valor,
          Math.floor(Math.random() * 999).toString()
        ),
        ...transacoes,
      ]);
    }
    if (random == 1) {
      loja = "Pag*Eletrônicos"
      valor = "R$ 20,00";
      setTransacoes((transacoes) => [
        new Transacao(
          "videogame-asset",
          "eletrônicos",
          loja,
          "01/01/2021",
          valor,
          Math.floor(Math.random() * 999).toString()
        ),
        ...transacoes,
      ]);
    }
    if (random == 2) {
      loja = "Pag*Restaurante"
      valor = "R$ 30,00";
      setTransacoes((transacoes) => [
        new Transacao(
          "restaurant",
          "restaurante",
          "Pag*Exemplo",
          "01/01/2021",
          "R$ 30,00",
          Math.floor(Math.random() * 999).toString()
        ),
        ...transacoes,
      ]);
    }

    setExibir(true);
    setSec(5);

    async function sendPushNotification(expoPushToken) {
      const message = {
        to: expoPushToken,
        sound: 'default',
        title: "BitBank",
        body: "Compra de " + valor + " aprovada no seu BitCard em "+loja+".",
        priority: AndroidNotificationPriority.MAX,
        data: { someData: 'goes here' },
      };
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    }
    await Notifications.scheduleNotificationAsync({
      
      content: {
        
        title: "BitBank",
        body: "Compra de " + valor + " aprovada no seu BitCard em "+loja+".",
        priority: AndroidNotificationPriority.MAX,
      },
      trigger: { seconds: 5 },
    });
    await new Promise((resolve) => setTimeout(resolve, 5000));
    ToastAndroid.showWithGravity(
      "NOTIFICAÇÃO EXIBIDA",
      1000,
      ToastAndroid.CENTER
    );
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      //console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    return token;
  }

  const nav = useNavigation();
  function navToLogin() {
    nav.navigate("login");
  }
  function navToCadastro() {
    nav.navigate("cadastro");
  }
  const [transacoes, setTransacoes] = React.useState([
    new Transacao(
      "restaurant",
      "restaurante",
      "Pag*Exemplo",
      "01/01/2021",
      "R$ 29,99",
      "353"
    ),
    new Transacao(
      "local-taxi",
      "transporte",
      "Mercpago *Exemplo",
      "01/01/2021",
      "R$ 50,00",
      "342"
    ),
    new Transacao(
      "videogame-asset",
      "eletrônicos",
      "Exemplo",
      "01/01/2021",
      "R$ 24,99",
      "987"
    ),
    new Transacao(
      "store",
      "Supermercado",
      "Pag*Supermercado",
      "01/01/2021",
      "R$ 7,99",
      "656"
    ),
    new Transacao(
      "dashboard",
      "Outros",
      "Mercadolivre*Mercadol",
      "01/01/2021",
      "R$ 62,00",
      "924"
    ),
  ]);
  const zoomOut = {
    0: {
      backgroundColor: "#0f0",
      opacity: 0,
      scale: 0,
    },
    0.5: {
      backgroundColor: "#0f0",
      opacity: 0.5,
      scale: 0,
    },
    1: {
      backgroundColor: "#0f0",
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Icon
            color={"#000"}
            style={{ marginLeft: 10 }}
            size={40}
            type={"ionicon"}
            name={"chevron-back"}
          />
        </TouchableOpacity>

        <Text style={{ fontSize: 15 }}>Cartão de Créd.</Text>

        <TouchableOpacity>
          <Icon
            color={"#000"}
            style={{ marginRight: 15 }}
            size={40}
            type={"ionicons"}
            name={"search"}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{}}>
        <SafeAreaView style={[styles.background, {}]}>
          <View style={{ width: "100%", alignItems: "center" }}>
            {!exibir && (
              <View style={{ width: 150 }}>
                <TouchableOpacity>
                  <Button
                    color={"#000"}
                    title="SIMULAR COMPRA"
                    onPress={() => schedulePushNotification()}
                    disabled={exibir}
                  />
                </TouchableOpacity>
              </View>
            )}
            {exibir && (
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                A notificação push só aparece com o app minimizado! Mostrando
                notificação em: {sec}
              </Text>
            )}
          </View>

          <StatusBar style="dark" />
          <View style={{ marginTop: "40%" }}>
            <View style={{ flexDirection: "row", flex: 2 }}>
              <View
                style={{
                  flex: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "50%",
                }}
              >
                <Text style={{ color: "#000", fontWeight: "bold" }}>
                  Fatura atual
                </Text>
                <Text style={{ color: "#02ada5", fontSize: 35 }}>
                  R$ 300,00
                </Text>
                <Text style={{ color: "#000", fontWeight: "bold" }}>
                  Limite disponível:{" "}
                  <Text style={{ color: "#0f5", fontWeight: "bold" }}>
                    R$ 300,00
                  </Text>
                </Text>
              </View>
            </View>
            <TouchableOpacity style={{ marginBottom: 10 }}>
              <View
                style={{
                  height: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#02ada5",
                    width: "40%",
                    height: 10,

                    borderTopLeftRadius: 50,
                    borderBottomLeftRadius: 50,
                  }}
                />
                <View
                  style={{
                    backgroundColor: "#0f5",
                    width: "40%",
                    height: 10,

                    borderTopRightRadius: 50,
                    borderBottomRightRadius: 50,
                  }}
                />
              </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#ddd",
                    padding: 1,
                    marginBottom: 10,
                  }}
                />
                <Text>Histórico de compras</Text>
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#ddd",
                    padding: 1,
                    marginTop: 10,
                  }}
                />
              </View>

              <View style={{ marginBottom: 45 }}>
                <AnimatedFlatlist
                  items={transacoes.concat([])}

                  inAnimation={zoomOut}
                  outAnimation={"fadeOut"}
                  duration={350}
                  rowItem={(it : any) => <ItemTransacao transacao={it.item} />}
                />
                {/* <FlatList
                  scrollEnabled={false}
                  data={transacoes}
                  renderItem={(data) => <ItemTransacao transacao={data.item} />}
                /> */}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
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
