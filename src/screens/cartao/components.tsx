import { useNavigation } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import Transacao from "./../../models/transacao";

export interface AppProps {
  transacao: Transacao;
}
export function ItemTransacao(props: AppProps) {
  return (

      <View
        style={[
          {
            borderBottomWidth: 1,
            borderColor: "#fff",
            backgroundColor: "#eee",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 15,
          },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <Icon
            color={"#aaa"}
            style={{ marginRight: 10 }}
            size={40}
            name={props.transacao.icon}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: "#aaa", fontSize: 12 }}>
              {props.transacao.tipo}
            </Text>
            <Text style={{ color: "#000" }}>{props.transacao.loja}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ color: "#000" }}>{props.transacao.data}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#000" }}>{props.transacao.valor}</Text>
            <Icon color={"#aaa"} style={{}} size={20} name={"chevron-right"} />
          </View>
        </View>
      </View>

  );
}
const styles = StyleSheet.create({});
