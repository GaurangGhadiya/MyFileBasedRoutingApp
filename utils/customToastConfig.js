// customToastConfig.js
import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  baseStyle: {
    borderLeftColor: 'green',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  text1Style: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: "green"
  },
  text2Style: {
    fontSize: 16,
  },
});

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={styles.baseStyle}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={styles.baseStyle}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
    />
  ),
};

export default toastConfig;
