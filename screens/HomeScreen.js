// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const Data = [
    {
      id: '1',
      title: 'Barcode Generator',
      redirect: 'BarcodeGenerator'},

      {
        id: '2',
        title: 'Barcode Scanner',
        redirect: 'NewBill'}
        // redirect: 'BarcodeScanner'}
    ]
    // ]

    const gap = 18;


export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
          <FlatList
          showsVerticalScrollIndicator={true}
          scrollEnabled={false}
            data={Data}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                      navigation.navigate(item?.redirect)

                   }}>
                 
                  <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
       
     
    
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'space-around',
    // alignItems: 'center',
    paddingHorizontal : 20,
    marginTop : 35
  },
  generate : {
    height : "45%",
    // width : "90%",
    display : "flex",
    justifyContent:"center",
    alignItems: "center",
    backgroundColor : "gray",
  },
  card: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    marginVertical : 20,
    // width: '47%',
    // minHeight: 222,
    position: 'relative',
   
    
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 25,
    color: 'black',
    textAlign: 'center'
  },
});
