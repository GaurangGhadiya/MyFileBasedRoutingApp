import {
  Alert,
  Button,
  KeyboardAvoidingView,
  ScrollView,
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
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate } from "../components/utils/formatDate";
import { SafeAreaView } from "react-native-web";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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

const NewOrderScreen = () => {
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("qwwww", formatDate(date));
    setSelectedDate(formatDate(date));
    console.log("date", date);
    // Alert.alert(date)
    hideDatePicker();
  };

  return (
      <KeyboardAwareScrollView style={{ backgroundColor : "white", paddingTop : 30, paddingBottom : 30}}>
    <ScrollView contentContainerStyle={styles.main}>
        {/* <Text style={styles.title}>Enter Barcode details</Text> */}
        <Formik
          initialValues={{
            vendorName: "",
            name: "",
            quantity: "",
            purchasePrice: 0,
            sellingPrice: 0,
            description: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            //  setdata([...data, values])
            //  setIsGenerated(true)
            resetForm();
            navigation.navigate("OrderTable");
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
                  // onBlur={handleBlur("password")}
                  value={values.purchasePrice}
                  maxLength={10}
                  keyboardType="numeric"
                />
                {errors.purchasePrice && touched.purchasePrice ? (
                  <Text style={styles.errorText}>{errors.purchasePrice}</Text>
                ) : null}
              </View>
              <View style={styles.mainInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Selling Price"
                  selectionColor={"#BABABB"}
                  onChangeText={handleChange("sellingPrice")}
                  // onBlur={handleBlur("password")}
                  value={values.sellingPrice}
                  maxLength={10}
                  keyboardType="numeric"
                />
                {errors.sellingPrice && touched.sellingPrice ? (
                  <Text style={styles.errorText}>{errors.sellingPrice}</Text>
                ) : null}
              </View>
              <View style={styles.mainInput}>
                <TouchableOpacity
                  onPress={showDatePicker}
                  style={styles.datePicker}
                >
                  <Text style={styles.datePickerText}>
                    {selectedDate ? `${selectedDate}` : "Select Date"}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
              <View style={styles.mainInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  selectionColor={"#BABABB"}
                  onChangeText={handleChange("description")}
                  // onBlur={handleBlur("password")}
                  value={values.description}
                  multiline={true}
                  numberOfLines={5}
                  textAlignVertical="top"
                />
                {errors.description && touched.description ? (
                  <Text style={styles.errorText}>{errors.description}</Text>
                ) : null}
              </View>

              <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                <Text style={styles.btnText}>Generate Order</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default NewOrderScreen;

const styles = StyleSheet.create({
  datePicker: {
    borderColor: "#BABABB",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    // alignItems: 'center',
  },
  datePickerText: {
    fontSize: 18,
    // color: "#BABABB",
  },
  containerDate: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputDate: {
    marginBottom: 20,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 30,
    // paddingTop : 50
  },
  mainInput: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    // height : 100,
    borderColor: "#BABABB",
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 5,
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
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    color: "red",
  },
  title: {
    fontSize: 22,
    marginBottom: 30,
    textAlign: "center",
    // fontWeight : 'bold',
  },
});
