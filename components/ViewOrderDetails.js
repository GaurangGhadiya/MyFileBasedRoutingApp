import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { Formik } from "formik";
  import * as Yup from "yup";
  import Toast from "react-native-toast-message";
  import { Button, Dialog, Portal } from "react-native-paper";
  import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "./utils/formatDate";

  
  const LoginSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    vendorName: Yup.string().required("Vendor name is required!"),
    quantity: Yup.string().required("Quantity is required!"),
    description: Yup.string().required("Description is required!"),
    purchasePrice: Yup.string()
      .matches(/^[0-9]+$/, "Please enter only numeric values!")
      .required("Purchase Price is required!")
      .test(
        "is-less-than-sellingPrice",
        "Purchase Price must be less than Selling Price",
        function (value) {
          const { sellingPrice } = this.parent;
          return value && sellingPrice
            ? parseFloat(value) < parseFloat(sellingPrice)
            : true;
        }
      ),
    sellingPrice: Yup.string()
      .matches(/^[0-9]+$/, "Please enter only numeric values!")
      .required("Selling Price is required!")
      .test(
        "is-greater-than-purchasePrice",
        "Selling Price must be greater than Purchase Price",
        function (value) {
          const { purchasePrice } = this.parent;
          return value && purchasePrice
            ? parseFloat(value) > parseFloat(purchasePrice)
            : true;
        }
      ),
  });
  
  const ViewOrderDetails = ({ visible, hideDialog, dialogData, mode,setdata, data }) => {
    console.log("dialogData", mode);
    const navigation = useNavigation()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));


    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
        console.log("qwwww",formatDate(date))
        setSelectedDate(formatDate(date))
        console.log('date', date)
        // Alert.alert(date)
      hideDatePicker();
    };
    return (
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={{ backgroundColor: "white", borderRadius: 10 }}
          >
            <Dialog.Content>
              <View style={styles.main}>
              <Text style={styles.title}>Product Details</Text>

                <Formik
                  initialValues={{
                    vendorName : dialogData.vendorName || "",
                    name: dialogData?.name ||"",
                    quantity: dialogData?.quantity ||"",
                    purchasePrice: dialogData?.purchasePrice ||0,
                    sellingPrice: dialogData?.sellingPrice ||0,
                    description: dialogData?.description ||"",
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={(values, { resetForm }) => {
                    console.log(values);

                    if(mode == "view"){
                        resetForm()
                        hideDialog();
                    }else if(mode == "edit"){
                        let newData = data?.map(v => v?.name == dialogData?.name ? {...dialogData,values} : v)
                        console.log("newData",newData)
                        setdata(newData)
                        resetForm()
                        hideDialog();
                    }
                  }}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                  }) => (
                    <View>
                           <View style={styles.mainInput}>
              <TextInput
                style={styles.input}
                placeholder="Vender Name"
                selectionColor={"#BABABB"}
                onChangeText={handleChange("vendorName")}
                // onBlur={handleBlur("vendorName")}
                value={values.vendorName}
                editable={mode == "edit"? true: false}

              />
              {errors.vendorName && touched.vendorName ? (
                <Text style={styles.errorText}>{errors.vendorName}</Text>
              ) : null}
            </View>
            <View style={styles.mainInput}>
              <TextInput
                style={styles.input}
                placeholder="Product Name"
                selectionColor={"#BABABB"}
                onChangeText={handleChange("name")}
                // onBlur={handleBlur("name")}
                value={values.name}
                editable={mode == "edit"? true: false}

              />
              {errors.name && touched.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
              ) : null}
            </View>
            <View style={styles.mainInput}>
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                selectionColor={"#BABABB"}
                onChangeText={handleChange("quantity")}
                // onBlur={handleBlur("password")}
                value={values.quantity}
                maxLength={10}
                keyboardType="numeric"
                editable={mode == "edit"? true: false}

              />
              {errors.quantity && touched.quantity ? (
                <Text style={styles.errorText}>{errors.quantity}</Text>
              ) : null}
            </View>
                      <View style={styles.mainInput}>
                        <TextInput
                          style={styles.input}
                          placeholder="Purchase Price"
                          selectionColor={"#BABABB"}
                          onChangeText={handleChange("purchasePrice")}
                          value={values.purchasePrice}
                          maxLength={10}
                          keyboardType="numeric"
                          editable={mode == "edit"? true: false}
                        />
                        {errors.purchasePrice && touched.purchasePrice ? (
                          <Text style={styles.errorText}>
                            {errors.purchasePrice}
                          </Text>
                        ) : null}
                      </View>
                      <View style={styles.mainInput}>
                        <TextInput
                          style={styles.input}
                          placeholder="Selling Price"
                          selectionColor={"#BABABB"}
                          onChangeText={handleChange("sellingPrice")}
                          value={values.sellingPrice}
                          maxLength={10}
                          keyboardType="numeric"
                          editable={mode == "edit"? true: false}
                        />
                        {errors.sellingPrice && touched.sellingPrice ? (
                          <Text style={styles.errorText}>
                            {errors.sellingPrice}
                          </Text>
                        ) : null}
                      </View>
                      <View style={styles.mainInput}>
                        <TextInput
                          style={styles.input}
                          placeholder="Description"
                          selectionColor={"#BABABB"}
                          onChangeText={handleChange("description")}
                          value={values.description}
                          multiline={true}
                          numberOfLines={5}
                          textAlignVertical="top"
                          editable={mode == "edit"? true: false}
                        />
                        {errors.description && touched.description ? (
                          <Text style={styles.errorText}>
                            {errors.description}
                          </Text>
                        ) : null}
                      </View>
                     <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                     <Text style={styles.btnText}>Save</Text>
                   </TouchableOpacity>
                    </View>
                  )}
                </Formik>
              </View>
            </Dialog.Content>
           
          </Dialog>
        </Portal>
    );
  };
  
  export default ViewOrderDetails;
  
  const styles = StyleSheet.create({
    main: {
    //   flex: 1,
    //   justifyContent: "center",
      backgroundColor: "white",
      paddingHorizontal: 30,
    },
    mainInput: {
      marginBottom: 20,
    },
    input: {
      width: "100%",
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderColor: "#BABABB",
      borderWidth: 1,
      fontSize: 18,
      borderRadius: 5,
    },
    errorText: {
      fontSize: 14,
      color: "red",
    },
    title: {
      fontSize: 22,
      marginBottom: 30,
      textAlign: "center",
    },
    btn: {
        display: "flex",
        alignItems: "center",
      },
      btnText: {
        textAlign: "center",
        backgroundColor: "#0A8ADC",
        width: 150,
        cursor: "pointer",
        color: "white",
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
        fontSize : 16
      },
  });
  