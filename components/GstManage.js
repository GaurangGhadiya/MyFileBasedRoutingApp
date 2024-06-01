import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  Text,
  RadioButton,
} from "react-native-paper";

const GstManage = ({ hideDialog, visible, selectedItem,handleChangeGst }) => {
  const [quantity, setQuantity] = React.useState();

  React.useEffect(() => {
    setQuantity(selectedItem?.gst?.toString());
  }, [selectedItem])
  

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{backgroundColor : "white", borderRadius : 10}}>
          {/* <Dialog.Title>Alert</Dialog.Title> */}
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to change the GST of {selectedItem?.name}? Current GST is {selectedItem?.gst?.toString()}.
            </Text>
            <RadioButton.Group onValueChange={newValue => setQuantity(newValue)} value={quantity?.toString()}>
      <View style={styles.quantityContainer}>
        <RadioButton value="0" />
        <Text>0%</Text>
      </View>
      <View style={styles.quantityContainer}>
        <RadioButton value="5" />
        <Text>5%</Text>
      </View>
      <View style={styles.quantityContainer}>
        <RadioButton value="12" />
        <Text>12%</Text>
      </View>
      <View style={styles.quantityContainer}>
        <RadioButton value="18" />
        <Text>18%</Text>
      </View>
      <View style={styles.quantityContainer}>
        <RadioButton value="28" />
        <Text>28%</Text>
      </View>
    </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} textColor="#0A8ADC">Cancel</Button>
            <Button onPress={() => handleChangeGst({...selectedItem, quantity})} textColor="#0A8ADC">Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default GstManage;

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
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
