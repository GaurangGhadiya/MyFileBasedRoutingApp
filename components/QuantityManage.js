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
        <Dialog visible={visible} onDismiss={hideDialog}>
          {/* <Dialog.Title>Alert</Dialog.Title> */}
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to change the GST of {selectedItem?.name}? Its current GST is {selectedItem?.quantity}.
            </Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.btn} onPress={() => decrementQuantity()}>
              <IconButton
    icon="minus"
    iconColor={"white"}
    size={20}
    
  />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity style={styles.btn} onPress={() => incrementQuantity()}>
              <IconButton
    icon="plus"
    iconColor={"white"}
    size={20}
    
  />
            
              </TouchableOpacity>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={() => handleChangeQty({...selectedItem, quantity})}>Save</Button>
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
  },
  btn  : {
    backgroundColor : "green",
    paddingHorizontal: 20,
    borderRadius : 15,
    
  }
});