import * as React from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
  IconButton,
  MD3Colors,
} from "react-native-paper";

const ChangeCalculate = ({ hideDialog, visible, price }) => {
  const [cusPrice, setcusPrice] = React.useState(0)


  

  const handleTextChange = (text) => {
    if (/^\d*$/.test(text)) {
        setcusPrice(text);
    }
  };

  const calculate = () => {
    if(!cusPrice){
        Alert.alert("Please enter value for chnage.");
    } else if(+cusPrice < +price){
        Alert.alert("Value for chnage is less then bill amount.");
    }else{
        let changePrice = ((+cusPrice - +price)?.toFixed(2))?.toString()+"₹"
        hideDialog();
         setcusPrice(0);
          Alert.alert(`You need to return ${changePrice} to the customer.`);
    }
  }
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{backgroundColor : "white", borderRadius : 10}}>
          {/* <Dialog.Title>Alert</Dialog.Title> */}
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to calculate change of {price}₹.
            </Text>
            <View style={styles.mainInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter value for change"
                  selectionColor={"#BABABB"}
                  onChangeText={(text) => handleTextChange(text)}
                  // onBlur={handleBlur("password")}
                  value={cusPrice}
                //   maxLength={10}
                  keyboardType="numeric"
                />
               
              </View>
            
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {hideDialog(); setcusPrice(0);}} textColor="#0A8ADC">Cancel</Button>
            <Button onPress={() => calculate()} textColor="#0A8ADC">Calculate</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ChangeCalculate;

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    paddingLeft: 15,
    paddingVertical :5
  },
  buttonContent: {
    // flexDirection: '',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  btn  : {
    backgroundColor : "green",
    paddingHorizontal: 20,
    borderRadius : 15,
    
  },
  mainInput: {
    marginTop: 20,
  },
  input: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 7,
    // height : 100,
    borderColor: "#BABABB",
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 5,
  },
});
