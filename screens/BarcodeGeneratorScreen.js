import React, { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { Barcode } from "expo-barcode-generator";

const BarcodeGenerator = () => {
  const [text, setText] = useState("");
  const [issHOW, setIssHOW] = useState(false);

  const handleButtonPress = () => {
    console.log("text", text);
    if (text) {
      setIssHOW(true);
    } else {
      Alert.alert("Please enter text");
    }
  };

  const handleInputChange = (inputValue) => {
    // Update the state with the new input value
    setText(inputValue);

    // You can perform any additional logic here
    console.log("Input value:", inputValue);
  };
  return (
    <View style={{ flex: 1,  alignItems: "center" }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: "90%",
          paddingLeft: 10,
          marginTop : 20
        }}
        onChangeText={handleInputChange}
        value={text}
        placeholder="Type something..."
        editable={!issHOW}
      />
      <View style={{ margin: 20 }}>
        {!issHOW ? (
          <Button title="Press Me" onPress={handleButtonPress} />
        ) : (
          <Button
            title="New Generate"
            onPress={() => {
              setText("");
              setIssHOW(false);
            }}
          />
        )}
      </View>
      {issHOW ? (
        <View style={{ width: "200px" }}>
          <Barcode
            value={JSON.stringify(text)}
            options={{
              format: "CODE128",
              displayValue: false,
              width: 2,
              height: 100,
            }}
            style={{ flex: 1 }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default BarcodeGenerator;
