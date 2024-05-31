// App.js
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import BarcodeGenerator from './screens/BarcodeGeneratorScreen';
import BarcodeScanners from './screens/BarcodeScannerScreen';
import ScannedDataScreen from './screens/ScannedDataScreen';
import NewBill from './components/NewBill';
import Login from './screens/Login';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import toastConfig from './utils/customToastConfig';
import NewBillScreen from './screens/NewBillScreen';


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
        navigation.navigate('Login')
        Toast.show({
          type: 'success',
          text1: 'Logout successful!',
        });
      }}
    />
  );
}

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: 'Welcome' , headerLeft : () => (<Text></Text>) ,headerRight: () => <HomeHeaderRight />, }}
        />
      <Stack.Screen
          name="BarcodeGenerator"
          component={BarcodeGenerator}
          options={{ headerTitle: 'Barcode Generator' }}
        />
      <Stack.Screen
          name="BarcodeScanner"
          component={BarcodeScanners}
          options={{ headerTitle: 'Barcode Scanner',headerRight : () => (<NewBill />) }}
        />
      <Stack.Screen
          name="ScannedData"
          component={ScannedDataScreen}
          options={{ headerTitle: 'Scanned Data' }}
        />
      <Stack.Screen
          name="NewBill"
          component={NewBillScreen}
          options={{ headerTitle: 'Create New Bill' }}
        />
      <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown : false}}
          // options={{ headerTitle : "Login", headerTitleAlign : "center"}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    <Toast ref={(ref) => Toast.setRef(ref)} config={toastConfig} position="bottom"/>
    </>
  );
}
