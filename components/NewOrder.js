import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';


const NewOrder = () => {
  const navigation = useNavigation();
  return (
    <>
    <TouchableOpacity onPress={() => navigation.navigate("NewOrder")}>

       <Icon name="file-image-plus" size={26} />
    </TouchableOpacity>
    </>
  )
}

export default NewOrder

const styles = StyleSheet.create({})