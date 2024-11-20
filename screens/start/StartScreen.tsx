/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, ImageBackground, View, Dimensions, Text } from "react-native";

const { height: screenHeight } = Dimensions.get("window");

interface StartScreenProps {
  component: "start" | "legal" | "login" | "signin";
}

export const StartScreen = ({ component }: StartScreenProps) => {
  const image = require("../../assets/background.png");

  const renderComponent = () => {
    switch (component) {
    case "start":
      return <View>
        <Text>Content</Text>
      </View>;
    case "legal":
      return <View>
        <Text>Content</Text>
      </View>;
    case "login":
      return <View>
        <Text>Content</Text>
      </View>;
    case "signin":
      return <View>
        <Text>Content</Text>
      </View>;
    default:
      return null;
    }
  };

  return (
    <ImageBackground source={image} style={styles.container}>
      <View style={styles.logoView}>
        <Text>LOGO</Text>
      </View>
      <View>
        {renderComponent()}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  logoView: {
    alignItems: "center",
    display: "flex",
    height: screenHeight * 0.26,
    justifyContent: "center",
    width: "100%",
  },
});
