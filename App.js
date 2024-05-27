// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import BarcodeGenerator from './screens/BarcodeGeneratorScreen';
import BarcodeScanners from './screens/BarcodeScannerScreen';
import ScannedDataScreen from './screens/ScannedDataScreen';

// Automatically import all screen components
// const screens = require.context('./screens', true, /\.js$/);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown : false }} // Set custom header title for Home screen
        />
      <Stack.Screen
          name="BarcodeGenerator"
          component={BarcodeGenerator}
          options={{ headerTitle: 'Barcode Generator' }} // Set custom header title for Home screen
        />
      <Stack.Screen
          name="BarcodeScanner"
          component={BarcodeScanners}
          options={{ headerTitle: 'Barcode Scanner' }} // Set custom header title for Home screen
        />
      <Stack.Screen
          name="ScannedData"
          component={ScannedDataScreen}
          options={{ headerTitle: 'Scanned Data' }} // Set custom header title for Home screen
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
