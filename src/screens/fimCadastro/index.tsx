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
  RawButton,
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
import firebase from "firebase";
import "firebase/firestore";
import { useState } from "react";
import Slider from "@react-native-community/slider";
import { LogBox } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { Picker } from "react-native";

export interface CadastroContProps {}

export default function CadastroContScreen(props: CadastroContProps) {
  const nav = useNavigation();
  const [termos, setTermos] = React.useState(false);
  const [selectedValue, setSelectedValue]: any = React.useState("10");
  const finalizar = async (dados: any) => {
    let token = "?";
    let permissao = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (permissao.status == "granted") {
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
    }
    let db = firebase.firestore();
    let conta = Math.floor(Math.random() * 9999) + 1111;
    let snapshot = await db
      .collection("Users")
      .where("conta".toString(), "==", conta.toString())
      .get();
    console.log(conta);
    let usuario = snapshot.empty ? null : snapshot.docs[0].data();

    if (usuario) {
      console.log("existe");
      while (usuario) {
        conta = Math.floor(Math.random() * 9999) + 1111;
        snapshot = await db
          .collection("Users")
          .where("conta".toString(), "==", conta.toString())
          .get();
        usuario = snapshot.empty ? null : snapshot.docs[0].data();
        console.log(conta);
      }
      console.log("fim");
    }
    try {
      const user = await firebase.auth().currentUser;
      //@ts-ignore
      let uid = user.uid;

      await db.collection("Users").doc(uid).update({
        rg: dados.rg,
        orgaoExpedidor: dados.orgaoExpedidor,
        complemento: dados.complemento,
        vencimento: dados.vencimento,
        estado: dados.estado,
        cidade: dados.cidade,
        bairro: dados.bairro,
        rua: dados.rua,
        cep: dados.cep,
        senhaCartao: dados.senhaCartao,
        rendimento: dados.rendimento,
        estadoEmissao: dados.estadoEmissao,
        telefone: dados.telefone,
        nacionalidade: dados.nacionalidade,
        saldo: 0,
        limite: slide,
        limiteTotal: slide,
        conta: conta,
        saques: 1,
        fatura: 0,
        token: token,
        bloqNacional: false,
        bloqInternacional: false,
        bloqFisico: false,
        bloqOnline: false,
        bloqTotal: false,
        bloqProximidade: false,
      });

      nav.navigate("principal");

      if (Platform.OS == "android") {
        ToastAndroid.showWithGravity("finalizado!", 2000, ToastAndroid.CENTER);
      } else {
        alert("finalizado!");
      }
    } catch (error) {
      console.error(error);

      if (Platform.OS == "android") {
        ToastAndroid.showWithGravity(error.message, 2000, ToastAndroid.CENTER);
      } else {
        alert(error.message);
      }
    }
  };
  const [cpf, setCpf] = React.useState("");
  function handleCustom(value: string) {
    setCpf(value);
  }
  const [slide, setSlide] = React.useState(100);
  const [page, setPage] = React.useState(1);
  return (
    <ImageBackground
      source={require("../../../assets/img/Background.png")}
      style={styles.background}
    >
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar style="light" backgroundColor="#000" />

        <HideWithKeyboard style={{ height: 85 }}>
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
            <TouchableOpacity
              onPress={() => {
                firebase.auth().signOut();
                nav.navigate("login");
              }}
            >
              <Icon
                color={"#fff"}
                style={{ marginLeft: 15, marginRight: 15, marginTop: 25 }}
                size={40}
                type={"ionicons"}
                name={"arrow-back"}
              />
            </TouchableOpacity>
            <Text style={styles.text3}>Cadastro</Text>
          </View>
        </HideWithKeyboard>

        <View style={styles.container}>
          <Formik
            initialValues={{
              rg: "",
              orgaoExpedidor: "",
              complemento: "",
              vencimento: "",
              estado: "",
              cidade: "",
              bairro: "",
              rua: "",
              cep: "",
              senhaCartao: "",
              rendimento: "",
              estadoEmissao: "",
              telefone: "",
              nacionalidade: "",
            }}
            validationSchema={Yup.object().shape({
              vencimento: Yup.string().required(
                "O campo 'vencimento' é obrigatório!"
              ),
              senhaCartao: Yup.string().required(
                "O campo 'senha' é obrigatório!"
              ),
              rendimento: Yup.string().required(
                "O campo 'rendimento mensal' é obrigatório!"
              ),
              cep: Yup.string().required("O campo 'CEP' é obrigatório!"),
              rua: Yup.string().required("O campo 'rua' é obrigatório!"),
              bairro: Yup.string().required("O campo 'bairro' é obrigatório!"),
              cidade: Yup.string().required("O campo 'cidade' é obrigatório!"),
              estado: Yup.string().required("O campo 'estado' é obrigatório!"),
              rg: Yup.string().required("O campo 'RG' é obrigatório!"),
              orgaoExpedidor: Yup.string().required(
                "O campo 'Órgão expedidor' é obrigatório!"
              ),
              estadoEmissao: Yup.string().required(
                "O campo 'Estado de emissão' é obrigatório!"
              ),
              nacionalidade: Yup.string().required(
                "O campo 'Nacionalidade' é obrigatório!"
              ),
              telefone: Yup.string().required(
                "O campo 'Telefone' é obrigatório!"
              ),
            })}
            onSubmit={finalizar}
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
                {page == 1 && (
                  <View
                    style={{
                      flex: 1,
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <HideWithKeyboard>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        Vamos terminar o seu cadastro?
                      </Text>
                    </HideWithKeyboard>

                    <HideWithKeyboard>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "center", width: 300 },
                        ]}
                      >
                        Logo você terá acesso a sua conta para realizar
                        transações!
                      </Text>
                    </HideWithKeyboard>

                    <View style={{ width: "100%" , alignItems:"center"}}>
                      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                        <Text style={styles.text}>
                          Dia de vencimento da fatura:
                        </Text>
                        <View style={{ flex: 1 }} />
                      </View>
                      <View style={{ width:"94%", borderRadius:5 ,borderWidth: 1, borderColor: "#000" }}>
                        <Picker
                          selectedValue={selectedValue}
                          style={{ height: 30, width: '100%' }}
                          onValueChange={(valor)=>{
                            setFieldValue("vencimento", valor)
                            setSelectedValue(valor)}
                          }
                        >                          
                          <Picker.Item label="10" value="10" />
                          <Picker.Item label="11" value="11" />
                          <Picker.Item label="12" value="12" />
                          <Picker.Item label="13" value="13" />
                          <Picker.Item label="14" value="14" />
                          <Picker.Item label="15" value="15" />
                          <Picker.Item label="16" value="16" />
                          <Picker.Item label="17" value="17" />
                          <Picker.Item label="18" value="18" />
                          <Picker.Item label="19" value="19" />
                          <Picker.Item label="20" value="20" />
                        </Picker>
                      </View>
                      
                      {touched.vencimento && errors.vencimento && (
                        <Text
                          style={{
                            color: "#f00",
                            fontSize: 13,
                            textAlign: "right",
                          }}
                        >
                          {errors.vencimento}
                        </Text>
                      )}
                    </View>

                    <View style={{ width: "100%" }}>
                      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                        <Text style={styles.text}>Senha do seu cartão:</Text>
                        <View style={{ flex: 1 }} />
                      </View>

                      <Input
                        leftIcon={{ type: "font-awesome", name: "key" }}
                        onBlur={handleBlur("senhaCartao")}
                        onChangeText={handleChange("senhaCartao")}
                        keyboardType="number-pad"
                        secureTextEntry
                        maxLength={4}
                        placeholder="1234"
                        style={styles.input}
                      />
                      {touched.senhaCartao && errors.senhaCartao && (
                        <Text
                          style={{
                            color: "#f00",
                            fontSize: 13,
                            textAlign: "right",
                          }}
                        >
                          {errors.senhaCartao}
                        </Text>
                      )}
                    </View>

                    <View style={{ width: "100%" }}>
                      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                        <Text style={styles.text}>Rendimento mensal:</Text>
                        <View style={{ flex: 1 }} />
                      </View>

                      <Input
                        leftIcon={{ type: "font-awesome", name: "money" }}
                        onBlur={handleBlur("rendimento")}
                        onChangeText={handleChange("rendimento")}
                        keyboardType="number-pad"
                        maxLength={10}
                        placeholder="R$ - 0,00"
                        style={styles.input}
                      />
                      {touched.rendimento && errors.rendimento && (
                        <Text
                          style={{
                            color: "#f00",
                            fontSize: 13,
                            textAlign: "right",
                          }}
                        >
                          {errors.rendimento}
                        </Text>
                      )}
                    </View>
                    <Text style={{ fontSize: 20, color: "#000" }}>
                      Limite inicial:
                    </Text>
                    <Slider
                      style={{ width: "90%", height: 40 }}
                      onSlidingComplete={(slide) => {
                        setSlide(slide);
                      }}
                      minimumValue={100}
                      maximumValue={600}
                      step={100}
                      minimumTrackTintColor="#0f0"
                      maximumTrackTintColor="#000000"
                    />
                    <Text style={{ fontSize: 20, color: "#000" }}>
                      Limite selecionado: R$ - {slide},00
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        setPage(2);
                      }}
                      style={styles.button}
                    >
                      <ImageBackground
                        imageStyle={{ borderRadius: 8 }}
                        source={require("../../../assets/img/button.png")}
                        style={styles.backgroundButton}
                      >
                        <Text style={styles.text2}>Continuar</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                )}
                {page == 2 && (
                  <View
                    style={{
                      flex: 1,
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <HideWithKeyboard>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "center", width: 400 },
                        ]}
                      >
                        Agora precisamos do seu endereço!
                      </Text>
                    </HideWithKeyboard>

                    <View style={{ width: "100%" }}>
                      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                        <Text style={styles.text}>CEP:</Text>
                        <View style={{ flex: 1 }} />
                      </View>

                      <Input
                        leftIcon={{ type: "font-awesome", name: "map-marker" }}
                        onBlur={handleBlur("cep")}
                        onChangeText={handleChange("cep")}
                        keyboardType="number-pad"
                        maxLength={10}
                        placeholder="12345-789"
                        style={styles.input}
                      />
                      {touched.cep && errors.cep && (
                        <Text
                          style={{
                            color: "#f00",
                            fontSize: 13,
                            textAlign: "right",
                          }}
                        >
                          {errors.cep}
                        </Text>
                      )}
                    </View>
                    <View style={{ flexDirection: "row", width: "100%" }}>
                      <View style={{ width: "60%" }}>
                        <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                          <Text style={styles.text}>Rua:</Text>
                          <View style={{ flex: 1 }} />
                        </View>

                        <Input
                          leftIcon={{ type: "font-awesome", name: "road" }}
                          onBlur={handleBlur("rua")}
                          onChangeText={handleChange("rua")}
                          placeholder="Rua do..."
                          style={styles.input}
                        />
                        {touched.rua && errors.rua && (
                          <Text
                            style={{
                              color: "#f00",
                              fontSize: 13,
                              textAlign: "right",
                            }}
                          >
                            {errors.rua}
                          </Text>
                        )}
                      </View>

                      <View style={{ width: "40%" }}>
                        <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                          <Text style={styles.text}>Número:</Text>
                          <View style={{ flex: 1 }} />
                        </View>

                        <Input
                          leftIcon={{ type: "font-awesome", name: "key" }}
                          onBlur={handleBlur("rendimento")}
                          onChangeText={handleChange("rendimento")}
                          keyboardType="number-pad"
                          maxLength={10}
                          placeholder="123"
                          style={styles.input}
                        />
                        {touched.rendimento && errors.rendimento && (
                          <Text
                            style={{
                              color: "#f00",
                              fontSize: 13,
                              textAlign: "right",
                            }}
                          >
                            {errors.rendimento}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View style={{ width: "100%" }}>
                      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                        <Text style={styles.text}>Bairro:</Text>
                        <View style={{ flex: 1 }} />
                      </View>

                      <Input
                        leftIcon={{ type: "font-awesome", name: "map-pin" }}
                        onBlur={handleBlur("bairro")}
                        onChangeText={handleChange("bairro")}
                        maxLength={10}
                        placeholder="Nome do bairro"
                        style={styles.input}
                      />
                      {touched.bairro && errors.bairro && (
                        <Text
                          style={{
                            color: "#f00",
                            fontSize: 13,
                            textAlign: "right",
                          }}
                        >
                          {errors.bairro}
                        </Text>
                      )}
                    </View>
                    <View style={{ width: "100%" }}>
                      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                        <Text style={styles.text}>Cidade:</Text>
                        <View style={{ flex: 1 }} />
                      </View>

                      <Input
                        leftIcon={{ name: "location-city" }}
                        onBlur={handleBlur("cidade")}
                        onChangeText={handleChange("cidade")}
                        maxLength={10}
                        placeholder="Nome da cidade"
                        style={styles.input}
                      />
                      {touched.cidade && errors.cidade && (
                        <Text
                          style={{
                            color: "#f00",
                            fontSize: 13,
                            textAlign: "right",
                          }}
                        >
                          {errors.cidade}
                        </Text>
                      )}
                    </View>
                    <View style={{ width: "100%" }}>
                      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                        <Text style={styles.text}>Estado:</Text>
                        <View style={{ flex: 1 }} />
                      </View>

                      <Input
                        leftIcon={{ type: "font-awesome", name: "map" }}
                        onBlur={handleBlur("estado")}
                        onChangeText={handleChange("estado")}
                        maxLength={10}
                        placeholder="Nome do estado"
                        style={styles.input}
                      />
                      {touched.estado && errors.estado && (
                        <Text
                          style={{
                            color: "#f00",
                            fontSize: 13,
                            textAlign: "right",
                          }}
                        >
                          {errors.estado}
                        </Text>
                      )}
                    </View>
                    <View style={{ width: "100%" }}>
                      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                        <Text style={styles.text}>Complemento:</Text>
                        <View style={{ flex: 1 }} />
                      </View>

                      <Input
                        leftIcon={{ type: "font-awesome", name: "list" }}
                        onBlur={handleBlur("complemento")}
                        onChangeText={handleChange("complemento")}
                        placeholder="Em frente a..."
                        style={styles.input}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setPage(1);
                        }}
                        style={styles.button2}
                      >
                        <ImageBackground
                          imageStyle={{ borderRadius: 8 }}
                          source={require("../../../assets/img/button.png")}
                          style={styles.backgroundButton}
                        >
                          <Text style={styles.text2}>Anterior</Text>
                        </ImageBackground>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setPage(3);
                        }}
                        style={styles.button2}
                      >
                        <ImageBackground
                          imageStyle={{ borderRadius: 8 }}
                          source={require("../../../assets/img/button.png")}
                          style={styles.backgroundButton}
                        >
                          <Text style={styles.text2}>Próximo</Text>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {page == 3 && (
                  <View
                    style={{
                      flex: 1,
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <HideWithKeyboard>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "center", width: 400 },
                        ]}
                      >
                        Por ultimo, seus dados.
                      </Text>
                    </HideWithKeyboard>

                    <View style={{ width: "100%" }}>
                      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                        <Text style={styles.text}>RG:</Text>
                        <View style={{ flex: 1 }} />
                      </View>

                      <Input
                        leftIcon={{ type: "font-awesome", name: "id-card" }}
                        onBlur={handleBlur("rg")}
                        onChangeText={handleChange("rg")}
                        keyboardType="number-pad"
                        maxLength={15}
                        placeholder="123456789"
                        style={styles.input}
                      />
                      {touched.rg && errors.rg && (
                        <Text
                          style={{
                            color: "#f00",
                            fontSize: 13,
                            textAlign: "right",
                          }}
                        >
                          {errors.rg}
                        </Text>
                      )}
                    </View>
                    <View style={{ flexDirection: "row", width: "100%" }}>
                      <View style={{ width: "50%" }}>
                        <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                          <Text style={styles.text}>Órgão expedidor:</Text>
                          <View style={{ flex: 1 }} />
                        </View>

                        <Input
                          leftIcon={{
                            type: "font-awesome",
                            name: "university",
                          }}
                          onBlur={handleBlur("orgaoExpedidor")}
                          onChangeText={handleChange("orgaoExpedidor")}
                          placeholder="SSP...SESP...SSPDS"
                          style={styles.input}
                        />
                        {touched.orgaoExpedidor && errors.orgaoExpedidor && (
                          <Text
                            style={{
                              color: "#f00",
                              fontSize: 13,
                              textAlign: "right",
                            }}
                          >
                            {errors.orgaoExpedidor}
                          </Text>
                        )}
                      </View>

                      <View style={{ width: "50%" }}>
                        <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                          <Text style={styles.text}>Estad. de em.:</Text>
                          <View style={{ flex: 1 }} />
                        </View>

                        <Input
                          leftIcon={{ type: "font-awesome", name: "map" }}
                          onBlur={handleBlur("estadoEmissao")}
                          onChangeText={handleChange("estadoEmissao")}
                          keyboardType="number-pad"
                          maxLength={10}
                          placeholder=""
                          style={styles.input}
                        />
                        {touched.estadoEmissao && errors.estadoEmissao && (
                          <Text
                            style={{
                              color: "#f00",
                              fontSize: 13,
                              textAlign: "right",
                            }}
                          >
                            {errors.estadoEmissao}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View style={{ width: "100%" }}>
                      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                        <Text style={styles.text}>Telefone:</Text>
                        <View style={{ flex: 1 }} />
                      </View>

                      <Input
                        leftIcon={{ type: "font-awesome", name: "phone" }}
                        onBlur={handleBlur("telefone")}
                        onChangeText={handleChange("telefone")}
                        placeholder="(12) 93456-7890"
                        style={styles.input}
                      />
                      {touched.telefone && errors.telefone && (
                        <Text
                          style={{
                            color: "#f00",
                            fontSize: 13,
                            textAlign: "right",
                          }}
                        >
                          {errors.telefone}
                        </Text>
                      )}
                    </View>
                    <View style={{ width: "100%" }}>
                      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                        <Text style={styles.text}>Nacionalidade:</Text>
                        <View style={{ flex: 1 }} />
                      </View>

                      <Input
                        leftIcon={{ name: "flag" }}
                        onBlur={handleBlur("nacionalidade")}
                        onChangeText={handleChange("nacionalidade")}
                        maxLength={10}
                        placeholder="Bra..."
                        style={styles.input}
                      />
                      {touched.nacionalidade && errors.nacionalidade && (
                        <Text
                          style={{
                            color: "#f00",
                            fontSize: 13,
                            textAlign: "right",
                          }}
                        >
                          {errors.nacionalidade}
                        </Text>
                      )}
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setPage(2);
                        }}
                        style={styles.button2}
                      >
                        <ImageBackground
                          imageStyle={{ borderRadius: 8 }}
                          source={require("../../../assets/img/button.png")}
                          style={styles.backgroundButton}
                        >
                          <Text style={styles.text2}>Anterior</Text>
                        </ImageBackground>
                      </TouchableOpacity>
                      {isSubmitting && (
                        <View style={styles.button2}>
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
                          onPress={() => {
                            try {
                              handleSubmit();
                            } catch (e) {
                              console.error(e);
                            }
                          }}
                          style={styles.button2}
                        >
                          <ImageBackground
                            imageStyle={{ borderRadius: 8 }}
                            source={require("../../../assets/img/button.png")}
                            style={styles.backgroundButton}
                          >
                            <Text style={styles.text2}>Finalizar</Text>
                          </ImageBackground>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )}
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
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
    padding: 0,
    flexDirection: "column",
    justifyContent: "center",
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
  button2: {
    borderRadius: 10,
    margin: 5,
    width: 150,
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
    width: "95%",
    height: "96%",
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
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
