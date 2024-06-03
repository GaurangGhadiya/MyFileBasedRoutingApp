// App.js
import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import BarcodeGenerator from "./screens/BarcodeGeneratorScreen";
import BarcodeScanners from "./screens/BarcodeScannerScreen";
import ScannedDataScreen from "./screens/ScannedDataScreen";
import NewBill from "./components/NewBill";
import Login from "./screens/Login";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import toastConfig from "./utils/customToastConfig";
import NewBillScreen from "./screens/NewBillScreen";
import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";

// Automatically import all screen components
// const screens = require.context('./screens', true, /\.js$/);

const Stack = createNativeStackNavigator();

function HomeHeaderRight() {
  const navigation = useNavigation();

  return (
    <Icon
      name="logout-variant"
      size={28}
      color="black"
      onPress={() => {
        navigation.navigate("Login");
        Toast.show({
          type: "success",
          text1: "Logout successful!",
        });
      }}
    />
  );
}

const SplashScreen = () => (
  <View style={styles.container}>
    <Animatable.View
      animation="pulse"
      easing="ease-out"
      iterationCount="infinite"
      style={styles.iconContainer}
    >
      <Icon name="barcode-scan" size={100} color={"#0A8ADC"} />
    </Animatable.View>
    {/* <Image source={require('./src/assets/logo.png')} style={styles.image} /> */}
  </View>
);

export default function App() {
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplashVisible(false);
    }, 2000); // Change the duration as needed
  }, []);

  return splashVisible ? (
    <SplashScreen />
  ) : (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: "Welcome",
              headerLeft: () => <Text></Text>,
              headerRight: () => <HomeHeaderRight />,
            }}
          />
          <Stack.Screen
            name="BarcodeGenerator"
            component={BarcodeGenerator}
            options={{ headerTitle: "Barcode Generator" }}
          />
          <Stack.Screen
            name="BarcodeScanner"
            component={BarcodeScanners}
            options={{
              headerTitle: "Barcode Scanner",
              headerRight: () => <NewBill />,
            }}
          />
          <Stack.Screen
            name="ScannedData"
            component={ScannedDataScreen}
            options={{ headerTitle: "Scanned Data" }}
          />
          <Stack.Screen
            name="NewBill"
            component={NewBillScreen}
            options={{ headerTitle: "Create New Bill" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
            // options={{ headerTitle : "Login", headerTitleAlign : "center"}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} position="bottom" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    // backgroundColor: '#00B386',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
