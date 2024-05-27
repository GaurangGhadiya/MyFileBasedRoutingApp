import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera";

export default function BarcodeScanners({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate("ScannedData")
    alert(`Bar code data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
     <View style={styles.camara}>
     <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['aztec' , 'ean13' , 'ean8' , 'qr' , 'pdf417' , 'upc_e' , 'datamatrix' , 'code39' , 'code93' , 'itf14' , 'codabar' , 'code128' , 'upc_a' ],
        }}
        style={styles.absoluteFillObject}
      />
      <Text style={styles.text}>Align the barcode within the box to auto scan</Text>
     </View>
      {scanned && (
        <View style={styles.button}>
            <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
            </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems : "center",
    justifyContent: "center",
  },
  absoluteFillObject : {
    height : 300,
    width : 300,
},
camara : {
    borderRadius: 7, // Set border radius here
    overflow: "hidden", 

  },
  text:{
    textAlign: "center",
    color : "gray"
  },
  button : {
    marginTop : 20
  }
});