import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';


const NewBill = () => {
  const navigation = useNavigation();
  return (
    <>
    <TouchableOpacity onPress={() => navigation.navigate("NewBill")}>

       <Icon name="file-image-plus" size={26} />
    </TouchableOpacity>
    </>
  )
}

export default NewBill

const styles = StyleSheet.create({})