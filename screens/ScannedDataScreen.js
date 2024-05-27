import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ScannedDataScreen = ({navigation}) => {
  return (
    <View style={styles.main}>
<View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.cell1}>Name</Text>
        <Text style={styles.cell2}>Price</Text>
        <Text style={styles.cell3}>Quantity</Text>
        <Text style={styles.cell4}>Total Price</Text>
        <Text style={styles.cell5}>Action</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell1}>Bartan</Text>
        <Text style={styles.cell2}>30</Text>
        <Text style={styles.cell3}>1</Text>
        <Text style={styles.cell4}>30</Text>
        <Text style={styles.cell5}>X</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.cell1}>Dol</Text>
        <Text style={styles.cell2}>30</Text>
        <Text style={styles.cell3}>2</Text>
        <Text style={styles.cell4}>60</Text>
        <Text style={styles.cell5}>X</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.cell1}></Text>
        <Text style={styles.cell2}></Text>
        <Text style={styles.cell3}></Text>
        <Text style={styles.cell4}>90</Text>
        <Text style={styles.cell5}></Text>
      </View>
      
    </View>
    <View style={styles.btns}>
    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("BarcodeScanner")}>
        <Text style={styles.save}>Scan Again</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn}>
        <Text style={styles.save}>Save</Text>
    </TouchableOpacity>
    </View>
    </View>
    
  )
}

export default ScannedDataScreen

const styles = StyleSheet.create({
    main : {
        flex : 1,
        // height : "100%",
        justifyContent : "space-between"
    },
    container: {
      borderWidth: 1,
    //   flex : 1,
      borderColor: '#000',
      borderRadius: 5,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
    //   justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,

      borderBottomColor: '#000',
    },
    cell: {
      flex: 1,
      textAlign: 'start',
      width : "20%"
    },
    cell1: {
    //   flex: 1,
      textAlign: 'start',
      width : "33%"
    },
    cell2: {
    //   flex: 1,
      textAlign: 'center',
      width : "15%"
    },
    cell3: {
    //   flex: 1,
      textAlign: 'center',
      width : "17%"
    },
    cell4: {
    //   flex: 1,
      textAlign: 'center',
      width : "22%"
    },
    cell5: {
    //   flex: 1,
      textAlign: 'center',
      width : "13%",
    //   paddingRight : 2
    },
    btn : {
        paddingVertical : 10,
        width : "45%",
        backgroundColor : "blue",
        borderRadius : 15

    },
    btns : {
        display : 'flex',
        justifyContent : "space-around",
        flexDirection: "row",
        marginBottom : 10

    },
    save: {
        color: "white",
        textAlign: "center",
        fontSize : 18
    }
  });