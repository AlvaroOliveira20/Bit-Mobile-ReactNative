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
import { BarCodeScanner } from "expo-barcode-scanner";
import {Constants, Notifications, Permissions} from 'expo';
import BarcodeMask from 'react-native-barcode-mask';

export interface BarcodeProps {}

export default function BarcodeScreen(props: BarcodeProps) {
  const nav = useNavigation();
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [barData, setBarData] = React.useState(null);
  const [status, setStatus] = React.useState(false);



  React.useEffect(() => {
    (async () => {
      
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");

      if(status != "granted"){
        nav.goBack()
      }
    })();
  }, []);
  

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(type)
    setScanned(true);
    setBarData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <ImageBackground
      source={require("../../../assets/img/Background.png")}
      style={styles.background}
    >
      <StatusBar style="light" backgroundColor="#000" />

      <View style={{ flex: 1 }}>
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
          <TouchableOpacity onPress={() => nav.goBack()}>
            <Icon
              color={"#fff"}
              style={{ marginLeft: 15, marginRight: 15, marginTop: 25 }}
              size={40}
              type={"ionicons"}
              name={"arrow-back"}
            />
          </TouchableOpacity>
          <Text style={styles.text3}>Leitor de Cod. Barras</Text>
        </View>
      </View>


        {scanned && (
          <View style={{flex: 9, justifyContent:'center', alignItems: 'center'}}>
          <View
            style={[
              {
                width: "85%",
                height: 220,
                borderRadius: 20,
                backgroundColor: "white",
                padding: 0,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 20,
                  height: 12,
                },
                shadowOpacity: 1,
                shadowRadius: 10.0,
                elevation: 10,
                justifyContent: "center",
              },
            ]}
          >
            <Text style={{ fontSize: 20 }}>Número do código: </Text>
            <TextInput
                
                keyboardType="number-pad"
                onChangeText={(data)=>setBarData(data)}
                
                leftIcon={{ type: "font-awesome", name: "key" }}
                value = {barData}
                style={[styles.input, {width: '80%', fontSize: 20, backgroundColor:"#eee", margin: 10, padding:7}]}
              />
            
            <TouchableOpacity
                onPress={() => {
                  
                }}
                style={[styles.button, {minWidth: '80%', borderRadius: 5}]}
              >
                <ImageBackground
                  imageStyle={{ borderRadius: 2 }}
                  source={require("../../../assets/img/button.png")}
                  style={styles.backgroundButton}
                >
                  <Text style={{color:'#fff', fontSize: 20, fontWeight: 'bold'}}>Continuar</Text>
                </ImageBackground>
              </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => setScanned(false)}>
              
             
            </TouchableOpacity> */}

          </View>
          </View>
        )}
        {!scanned && (
          <>
          
          <BarCodeScanner
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.code128]
            }
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}

            style={{ width: "100%", height: "100%", flex: 9 }}
            
          >
            <BarcodeMask width={100} height={500} />
          </BarCodeScanner>
          </>
        )}

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
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
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
    height: 350,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 30,
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
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
