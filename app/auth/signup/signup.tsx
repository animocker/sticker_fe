import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Button from "../../../components/buttons/Button";
import { router } from "expo-router";
import Background from "../../../components/for_screens/Background";

const { height: screenHeight } = Dimensions.get("window");

export default function Login() {
  return (
    <Background>
      <View style={styles.logoView}>
        <Text>Sign Up</Text>
        <Button text="Back" onPress={() => router.back()} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  logoView: {
    alignItems: "center",
    display: "flex",
    height: screenHeight,
    justifyContent: "center",
    width: "100%",
  },
});
