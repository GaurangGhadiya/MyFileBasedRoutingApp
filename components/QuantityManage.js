import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
  IconButton,
  MD3Colors,
} from "react-native-paper";

const QuantityManage = ({ hideDialog, visible, selectedItem,handleChangeQty }) => {
  const [quantity, setQuantity] = React.useState(selectedItem?.gst ?? 0);

  React.useEffect(() => {
    setQuantity(selectedItem?.quantity);
  }, [selectedItem])
  

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity - 1);

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{backgroundColor : "white", borderRadius : 10}}>
          {/* <Dialog.Title>Alert</Dialog.Title> */}
          <Dialog.Content>
            <Text variant="bodyMedium" style={styles.cb}>
              Are you sure you want to change the GST of {selectedItem?.name}? Its current GST is {selectedItem?.quantity}.
            </Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.btn} onPress={() => decrementQuantity()}>
              <IconButton
    icon="minus"
    iconColor={"#0A8ADC"}
    size={20}
    
  />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity style={styles.btn} onPress={() => incrementQuantity()}>
              <IconButton
    icon="plus"
    iconColor={"#0A8ADC"}
    size={20}
    
  />
            
              </TouchableOpacity>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} textColor="#0A8ADC">Cancel</Button>
            <Button onPress={() => handleChangeQty({...selectedItem, quantity})} textColor="#0A8ADC">Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default QuantityManage;

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
    color : "black",
  },
  btn  : {
    borderColor : "#0A8ADC",
    borderWidth : 1,
    borderRadius : 10,
    height : 40,
    alignItems : "center",
    justifyContent : "center",
    display : "flex",
    
  },
  cb : {
    color:"black"
  }
});
