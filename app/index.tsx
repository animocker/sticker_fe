import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Button from "../components/buttons/Button";
import { router } from "expo-router";
import Background from "../components/for_screens/Background";
import StartImageView from "../components/for_screens/ImageStartScreen";

const { height: screenHeight } = Dimensions.get("window");

export default function Start() {
  return (
    <Background>
      <View style={styles.logoView}>
        <Text>LOGO</Text>
        <StartImageView />
        <Button text="Login" onPress={() => router.push("auth/login")} />
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
