import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { StackActions } from "@react-navigation/native";
import {
  CardAnimationContext,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

export interface SplashProps {}

export default function SplashScreen(props: SplashProps) {
  const nav = useNavigation();
  const [unsubscribe, setUnsubscribe] = React.useState<any>(null);
  const [firebaseCompletou, setFirebaseCompletou] = React.useState(false);
  const [animacaoCompletou, setAnimacaoCompletou] = React.useState(false);

  async function navigate() {
    console.log("B");
    console.log(unsubscribe);

    let user = firebase.auth().currentUser;
    if (user) {
      nav.navigate("principal");
      nav.reset({
        index: 0,
        routes: [
          {
            name: "principal",
          },
        ],
      });
    } else {
      if (
        (await AsyncStorage.getItem("biometria")) == "true" &&
        !firebase.auth().currentUser
      ) {
        LocalAuthentication.hasHardwareAsync().then((result: any) => {
          if (result) {
            LocalAuthentication.isEnrolledAsync().then((result) => {
              if (result) {
                let options = {
                  promptMessage: "Use a biometria para autenticar.",
                };
                LocalAuthentication.authenticateAsync(options).then(
                  async (result) => {
                    if (result.success) {
                      let email: any = await AsyncStorage.getItem("email");
                      let senha: any = await AsyncStorage.getItem("senha");
                      await firebase
                        .auth()
                        .signInWithEmailAndPassword(email, senha)
                        .then(() => {
                          nav.navigate("principal");
                          nav.reset({
                            index: 0,
                            routes: [
                              {
                                name: "principal",
                              },
                            ],
                          });
                        });
                    } else {
                      nav.navigate("home");
                      nav.reset({
                        index: 0,
                        routes: [
                          {
                            name: "home",
                          },
                        ],
                      });
                    }
                  }
                );
              }
            });
          }
        });
      } else {
        nav.navigate("home");
        nav.reset({
          index: 0,
          routes: [
            {
              name: "home",
            },
          ],
        });
      }
    }
  }

  //INiciou a tela
  React.useEffect(() => {
    console.log("A");
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async () => setFirebaseCompletou(true));
    //console.log("Unsub", unsubscribe);
    
    //if (unsubscribe == null) setUnsubscribe(unsubscribe);
  });

  //Ativa Navigate
  React.useEffect(() => {
    console.log("D");
    if (firebaseCompletou && animacaoCompletou) navigate();
  }, [firebaseCompletou, animacaoCompletou]);

  return (
    <LottieView
      onAnimationFinish={() => setAnimacaoCompletou(true)}
      style={{ backgroundColor: "white" }}
      source={require("./../splash/lottie.json")}
      autoPlay
      loop={false}
    />
  );
}

const styles = StyleSheet.create({});
