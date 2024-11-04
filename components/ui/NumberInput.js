import React from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";

const NumberInput = ({ inputValue, setInputValue }) => {
  const increaseValue = () => {
    setInputValue((prevValue) => (parseInt(prevValue) + 1).toString());
  };

  const decreaseValue = () => {
    setInputValue((prevValue) => (parseInt(prevValue) - 1).toString());
  };

  return (
    <View style={styles.container}>
      <Button title="-" onPress={decreaseValue} />
      <TextInput style={styles.input} onChangeText={setInputValue} value={inputValue.toString()} keyboardType="numeric" />
      <Button title="+" onPress={increaseValue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    height: 40,
    textAlign: "center",
    width: 50,
  },
});

export default NumberInput;
