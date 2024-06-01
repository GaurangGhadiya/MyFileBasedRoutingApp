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
  
  const LoginSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    address: Yup.string().required("Address is required!"),
    mobile: Yup.string()
    .min(10, "Mobile number must be 10 digits!")
    .matches(/^[0-9]{10}$/, 'Please enter only numeric values!')
      .required("Mobile Number is required!"),
  });
  
  const NewBillScreen = ({navigation}) => {
    return (
      <View style={styles.main}>
       <Text style={styles.title}>Enter customer details</Text>
        <Formik
          initialValues={{ name: "", mobile: "" ,address:""}}
          // validationSchema={LoginSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            resetForm()
            navigation.navigate("BarcodeScanner")
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
                  placeholder="Name"
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
                  placeholder="Mobile Number"
                  selectionColor={"#BABABB"}
                  onChangeText={handleChange("mobile")}
                  // onBlur={handleBlur("password")}
                  value={values.mobile}
                  maxLength={10}
                  keyboardType="numeric"
                />
                 {errors.mobile && touched.mobile ? (
              <Text style={styles.errorText}>{errors.mobile}</Text>
            ) : null}
              </View>
              <View style={styles.mainInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  selectionColor={"#BABABB"}
                  onChangeText={handleChange("address")}
                  // onBlur={handleBlur("password")}
                  value={values.address}
                  multiline={true}
        numberOfLines={5}
        textAlignVertical="top"
                />
                 {errors.address && touched.address ? (
              <Text style={styles.errorText}>{errors.address}</Text>
            ) : null}
              </View>
  
              <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                <Text style={styles.btnText}>Scan Barcode</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    );
  };
  
  export default NewBillScreen;
  
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: "center",
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
      fontSize : 16
    },
    errorText: {
      fontSize: 14,
      color: 'red',
    },
    title : {
      fontSize : 22,
      marginBottom : 30,
      textAlign : 'center',
      // fontWeight : 'bold',
    }
    
  });
  