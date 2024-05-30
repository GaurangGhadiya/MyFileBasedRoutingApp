import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera";
import ScannedDataScreen from "./ScannedDataScreen";

export default function BarcodeScanners({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data1, setData] = useState([]);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const increaseQty = (item) => {
    let data = [...data1]
    let newData = data?.map(v => v?.id == item?.id ? {
      ...v,
      quantity: v?.quantity + 1,
    } : v)
    console.log('newData', newData)
    setData(newData)
  }
  const decreaseQty = (item) => {
    let data = [...data1]
    let newData = data?.map(v => v?.id == item?.id ? {
      ...v,
      quantity: v?.quantity - 1,
    } : v)
    setData(newData)
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let isIncluded = data1?.find((v) => v?.name == data);
    if (isIncluded) {
      let newData = data1?.map((v) =>
        v?.name == data
          ? {
              ...v,
              quantity: v?.quantity + 1,
            }
          : v
      );
      setData(newData);
    } else {
      setData([
        ...data1,
        {
          name: data,
          price: Math.floor(Math.random() * 100) + 1,
          quantity: 1,
          id: String(Math.floor(Math.random() * 1000000)).padStart(6, "0"),
          gst: 0
        },
      ]);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return !scanned ? (
    <View style={styles.container}>
      <View style={styles.camara}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: [
              "aztec",
              "ean13",
              "ean8",
              "qr",
              "pdf417",
              "upc_e",
              "datamatrix",
              "code39",
              "code93",
              "itf14",
              "codabar",
              "code128",
              "upc_a",
            ],
          }}
          style={styles.absoluteFillObject}
        />
        <Text style={styles.text}>
          Align the barcode within the box to auto scan
        </Text>
      </View>
    </View>
  ) : (
    <ScannedDataScreen
      setScanned={setScanned}
      data1={data1}
      setData={setData}
      increaseQty={increaseQty}
      decreaseQty={decreaseQty}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  absoluteFillObject: {
    height: 300,
    width: 300,
  },
  camara: {
    borderRadius: 7, // Set border radius here
    overflow: "hidden",
  },
  text: {
    textAlign: "center",
    color: "gray",
  },
  button: {
    marginTop: 20,
  },
});
