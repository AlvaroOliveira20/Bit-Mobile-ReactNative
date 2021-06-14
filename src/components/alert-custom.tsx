import * as React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Modal } from "react-native";
import { Icon } from "react-native-elements";

export interface AlertCustomProps {
  titulo?: string;
  visivel: boolean;
  onBarcode(): void;
  onCancelar(): void;
  children?: any;
}
export function AlertCustom(props: AlertCustomProps) {
  return (
    <Modal visible={props.visivel} animationType="slide" transparent>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "#fff",
            width: "80%",
            height: "80%",
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 20,
              height: 12,
            },
            shadowOpacity: 1,
            shadowRadius: 10.0,
            elevation: 50,
            borderColor: "#156e65",
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ width: "100%", alignItems: "flex-end", marginRight: 10, marginTop: 10}}>
              <Icon
                onPress={props.onCancelar}
                color={"#aaa"}
                style={{ }}
                size={40}
                name={"close"}
              />
            </View>
            <TouchableOpacity style={{ flex: 1, justifyContent:'center'}} onPress={props.onBarcode}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                color={"#aaa"}
                style={{ marginRight: 10 }}
                size={30}
                type={"font-awesome"}
                name={"barcode"}
              />
              <Text>Com código de barras</Text>
              </View>
            </TouchableOpacity>
            <View style={{borderTopWidth:1,borderColor:"#ccc", width: '100%'}}></View>
            <View style={{ flex: 1, justifyContent:'center'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                color={"#aaa"}
                style={{ marginRight: 10 }}
                size={30}
                name={"text-snippet"}
              />
              <Text>Sem código de barras</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    //backgroundColor:'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
