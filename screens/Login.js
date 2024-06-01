import {
  Image,
  ImageBackground,
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
  userName: Yup.string().required("Username is required!"),
  password: Yup.string()
    .min(3, "Password must be atleast 3 characters!")
    .required("Password is required!"),
});

const Login = ({navigation}) => {
  return (
    <>
    {/* <ImageBackground source={require('../assets/bubal.png')} style={styles.backgroundImage} >  */}
    <View style={styles.main}>
      

      <Text style={styles.welcome}>Welcome 👋!</Text>
      <Text style={styles.login}>Login</Text>
      <Text style={styles.desc}>To Your Account</Text>
      <Formik
        initialValues={{ userName: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          Toast.show({
            type: 'success',
            text1: 'Login successful!',
          });
          resetForm()
          navigation.navigate("Home")
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
                placeholder="Username"
                selectionColor={"#BABABB"}
                onChangeText={handleChange("userName")}
                // onBlur={handleBlur("userName")}
                value={values.userName}
              />
              {errors.userName && touched.userName ? (
            <Text style={styles.errorText}>{errors.userName}</Text>
          ) : null}
            </View>
            <View style={styles.mainInput}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                selectionColor={"#BABABB"}
                onChangeText={handleChange("password")}
                // onBlur={handleBlur("password")}
                secureTextEntry
                value={values.password}
              />
               {errors.password && touched.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
      {/* </ImageBackground> */}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    // flex: 1,s
    justifyContent: "center",
    // backgroundColor: "white",
    paddingHorizontal: 30,
    height: "100%",

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
  welcome: {
    fontSize: 30,
    marginBottom: 15,
    color: "#0A8ADC",
  },
  login: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0A8ADC",
  },
  desc: {
    fontSize: 16,
    marginBottom: 40,
    color: "#0A8ADC",
  },
  backgroundImage : {
    // flex : 1,
    resizeMode: "center",
    // justifyContent: "center",
    // alignItems: "center",
  }
});
