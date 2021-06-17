import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

import { AlertCustom } from "./../../components/alert-custom";
import { AlertConvite} from "./components/convite";
import { AlertAjuda} from "./components/ajuda";
import { AlertCobrar} from "./components/deposito";
import { Dimensions } from "react-native";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import firebase from "firebase";
import { LogBox } from "react-native";
import PTRView from "react-native-pull-to-refresh";

console.disableYellowBox = true;

export interface PrincipalProps {}

export default function PrincipalScreen(props: PrincipalProps) {
  async function refresh() {
    let db = firebase.firestore();
    const user = firebase.auth().currentUser;
    db.collection("Users")
      .doc(user?.uid)
      .get()
      .then((resultado) => {
        let dados = resultado.data();
        //@ts-ignore

        let saldo = dados.saldo.toString().split(".");
        if (saldo.length > 1) {
          if (saldo[1].length == 1) {
            saldo[1] = saldo[1] + "0";
          }
          saldo = saldo[0] + "," + saldo[1];
        } else {
          saldo = saldo + ",00";
        }
        //@ts-ignore
        setSaldo(saldo);

        //@ts-ignore
        setSaques(dados.saques);

        //@ts-ignore
        let fatura = dados.fatura.toString().split(".");
        if (fatura.length > 1) {
          if (fatura[1].length == 1) {
            fatura[1] = fatura[1] + "0";
          }
          fatura = fatura[0] + "," + fatura[1];
        } else {
          fatura = fatura + ",00";
        }
        //@ts-ignore
        setFatura(fatura);

        //@ts-ignore
        let limite = dados.limite.toString().split(".");
        if (limite.length > 1) {
          if (limite[1].length == 1) {
            limite[1] = limite[1] + "0";
          }
          limite = limite[0] + "," + limite[1];
        } else {
          limite = limite + ",00";
        }
        //@ts-ignore
        setLimite(limite);

        //@ts-ignore
        let limiteTotal = dados.limiteTotal.toString().split(".");
        if (limiteTotal.length > 1) {
          if (limiteTotal[1].length == 1) {
            limiteTotal[1] = limiteTotal[1] + "0";
          }
          limiteTotal = limiteTotal[0] + "," + limiteTotal[1];
        } else {
          limiteTotal = limiteTotal + ",00";
        }
        //@ts-ignore
        setLimiteTotal(limiteTotal);
        //@ts-ignore
        setNome(dados.nome);
        //@ts-ignore
        setConta(dados.conta);
      });
  }
  const [saldo, setSaldo] = React.useState(0);
  const [saques, setSaques] = React.useState(0);
  const [fatura, setFatura] = React.useState(0);
  const [limite, setLimite] = React.useState(0);
  const [limiteTotal, setLimiteTotal] = React.useState(0);
  const [nome, setNome] = React.useState("");
  const [conta, setConta] = React.useState(0);
  const [info, setInfo] = React.useState(1);

  useFocusEffect(() => {
    (async () => {
      let db = firebase.firestore();
      const user = firebase.auth().currentUser;
      db.collection("Users")
        .doc(user?.uid)
        .get()
        .then((resultado) => {
          let dados = resultado.data();
          //@ts-ignore
          if (dados.limite > dados.limiteTotal) {
            dados.limite = dados.limiteTotal - dados.fatura;
            if (dados.limite < 0) dados.limite = 0;
          }

          let saldo = dados.saldo.toString().split(".");
          if (saldo.length > 1) {
            if (saldo[1].length == 1) {
              saldo[1] = saldo[1] + "0";
            }
            saldo = saldo[0] + "," + saldo[1];
          } else {
            saldo = saldo + ",00";
          }
          //@ts-ignore
          setSaldo(saldo);

          //@ts-ignore
          setSaques(dados.saques);

          //@ts-ignore
          let fatura = dados.fatura.toString().split(".");
          if (fatura.length > 1) {
            if (fatura[1].length == 1) {
              fatura[1] = fatura[1] + "0";
            }
            fatura = fatura[0] + "," + fatura[1];
          } else {
            fatura = fatura + ",00";
          }
          //@ts-ignore
          setFatura(fatura);

          //@ts-ignore
          let limite = dados.limite.toString().split(".");
          if (limite.length > 1) {
            if (limite[1].length == 1) {
              limite[1] = limite[1] + "0";
            }
            limite = limite[0] + "," + limite[1];
          } else {
            limite = limite + ",00";
          }
          //@ts-ignore
          setLimite(limite);

          //@ts-ignore
          let limiteTotal = dados.limiteTotal.toString().split(".");
          if (limiteTotal.length > 1) {
            if (limiteTotal[1].length == 1) {
              limiteTotal[1] = limiteTotal[1] + "0";
            }
            limiteTotal = limiteTotal[0] + "," + limiteTotal[1];
          } else {
            limiteTotal = limiteTotal + ",00";
          }
          //@ts-ignore
          setLimiteTotal(limiteTotal);
          //@ts-ignore
          setNome(dados.nome);
          //@ts-ignore
          setConta(dados.conta);
        });
    })();
  });

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
  const [visibilidade2, setVisibilidade2] = React.useState(false);
  const [visibilidade3, setVisibilidade3] = React.useState(false);
  const [visibilidade4, setVisibilidade4] = React.useState(false);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [cpf, setCpf] = React.useState("");

  function handleCustom(value: string) {
    setCpf(value);
  }
  return (
    <PTRView onRefresh={refresh}>
      <ImageBackground
        source={require("../../../assets/img/Background.png")}
        style={styles.background}
      >
        <AlertCustom
          titulo="Teste"
          visivel={visibilidade}
          onCancelar={() => {
            setVisibilidade(false);
          }}
          onBarcode={() => {
            nav.navigate("barcode");
            setVisibilidade(false);
          }}
        />
        <AlertConvite
          titulo="Teste"
          visivel={visibilidade2}
          onCancelar={() => {
            setVisibilidade2(false);
          }}
          onCompleted={() => {
            setVisibilidade2(false);
          }}
        />
        <AlertAjuda
          titulo="Teste"
          visivel={visibilidade3}
          onCancelar={() => {
            setVisibilidade3(false);
          }}
          onCompleted={() => {
            setVisibilidade3(false);
          }}
        />
        <AlertCobrar
          titulo="Teste"
          visivel={visibilidade4}
          onCancelar={() => {
            setVisibilidade4(false);
          }}
          onCompleted={() => {
            setVisibilidade4(false);
          }}
        />
        <StatusBar style="light" backgroundColor="#000" />

        <View style={[styles.container2, {}]}>
          {info == 0 && (
            <View
              style={[
                styles.card,
                {
                  width: "90%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                  marginTop: 5,
                  marginBottom: 5,
                  flexDirection: "row",
                },
              ]}
            >
              <Icon
                onPress={() => nav.navigate("configuracoes")}
                style={{ marginLeft: 15 }}
                size={20}
                type="font-awesome"
                name="gear"
              />
              <Text style={[styles.text3, { color: "#000", marginTop: 0 }]}>
                Olá, {nome}!
              </Text>
              <Icon
                style={{ marginLeft: 15 }}
                size={20}
                type="font-awesome"
                name="chevron-down"
                onPress={() => {
                  setInfo(1);
                }}
              />
            </View>
          )}
          {info == 1 && (
            <View
              style={[
                styles.card,
                {
                  width: "90%",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                  marginTop: 5,
                  marginBottom: 5,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Icon
                  onPress={() => nav.navigate("configuracoes")}
                  style={{ marginLeft: 5 }}
                  size={20}
                  type="font-awesome"
                  name="gear"
                />
                <Text style={[styles.text3, { color: "#000", marginTop: 0 }]}>
                  Olá, {nome}!
                </Text>
                <Icon
                  style={{ marginRight: 5 }}
                  size={20}
                  type="font-awesome"
                  name="chevron-up"
                  onPress={() => {
                    setInfo(0);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "75%",
                }}
              >
                <Text
                  style={[
                    styles.text3,
                    { color: "#000", fontSize: 18, marginTop: 0 },
                  ]}
                >
                  Conta: {conta}
                </Text>
                <Text
                  style={[
                    styles.text3,
                    { color: "#000", fontSize: 18, marginTop: 0 },
                  ]}
                >
                  Agência: 001
                </Text>
              </View>
              <Text
                style={[
                  styles.text3,
                  { color: "#000", fontSize: 18, marginTop: 0 },
                ]}
              >
                Banco: BIT pagamentos S.A.
              </Text>
            </View>
          )}
          <View
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={[
                styles.card,
                {
                  maxWidth: "90%",
                  flex: 1,

                  padding: 0,
                  alignItems: "center",
                },
              ]}
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                  // Animated.event returns a function that takes an array where the first element...
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }] // ... is an object that maps any nativeEvent prop to a variable
                )} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
                scrollEventThrottle={16} // this will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call
                scrollEnabled
                pagingEnabled
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ minWidth: "100%" }}
              >
                <TouchableOpacity
                  onPress={() => {
                    nav.navigate("cartao");
                  }}
                  style={{ flex: 1, width: width90, padding: 30 }}
                >
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
                    <Text style={[styles.text, { fontSize: 15 }]}>
                      FATURA ATUAL:
                    </Text>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 45,
                        fontWeight: "bold",
                      }}
                    >
                      R$ {fatura}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginTop: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>
                      Limite disponível: R${limite}
                    </Text>
                    <Text
                      style={[styles.text, { fontSize: 18, color: "#888" }]}
                    >
                      Limite Total: R${limiteTotal}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={{ flex: 1, width: width90, padding: 30 }}>
                  <View
                    style={{
                      marginTop: 10,
                      alignItems: "center",
                    }}
                  >
                    <Icon size={50} name="point-of-sale" />
                    <Text style={styles.text}>CONTA</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 25,
                      flex: 3,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text style={[styles.text, { fontSize: 15 }]}>Saldo:</Text>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 45,
                        fontWeight: "bold",
                      }}
                    >
                      R$ {saldo}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginTop: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>Saques gratuitos: {saques}</Text>
                  </View>
                </View>
              </ScrollView>
              <ExpandingDot
                data={SLIDER_DATA}
                expandingDotWidth={30}
                scrollX={scrollX}
                inActiveDotOpacity={0.6}
                dotStyle={{
                  width: 10,
                  height: 10,
                  backgroundColor: "#18a383",
                  borderRadius: 5,
                  marginHorizontal: 5,
                }}
                containerStyle={{
                  top: "95%",
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await firebase.auth().signOut();
              nav.navigate("login");
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

        <View style={[styles.container, {}]}>
          <ScrollView style={{}} horizontal>
            <TouchableOpacity
              onPress={() => {
                setVisibilidade(true);
              }}
            >
              <View style={{ marginLeft: 15 }}>
                <View style={styles.card2}>
                  <View style={{ flex: 9 }}>
                    <Icon
                      style={{ marginTop: 10 }}
                      size={60}
                      type="font-awesome"
                      name="barcode"
                      color="white"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Pagamentos
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                nav.navigate("pix");
              }}
            >
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
            <TouchableOpacity
              onPress={() => {
                nav.navigate("transferencia");
              }}
            >
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
            <TouchableOpacity
              onPress={() => {
                nav.navigate("ajuste-limite");
              }}
            >
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

            <TouchableOpacity
              onPress={() => {
                nav.navigate("bloqueio");
              }}
            >
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
            <TouchableOpacity
              onPress={() => {
                nav.navigate("cartao-virtual");
              }}
            >
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
            <TouchableOpacity
            onPress={() => {
              setVisibilidade2(true);
            }}>
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
            <TouchableOpacity
            onPress={() => {
              setVisibilidade3(true);
            }}>
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

            <TouchableOpacity
            onPress={() => {
              setVisibilidade4(true);
            }}>
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
    </PTRView>
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
