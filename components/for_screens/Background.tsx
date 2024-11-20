import React, { ReactNode } from "react";
import { ImageBackground, StyleSheet } from "react-native";

interface BackgroundProps {
  children: ReactNode;
}

export default function Background({ children }: BackgroundProps) {
  const image = require("../../assets/background.png");

  return (
    <ImageBackground source={image} style={styles.container}>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
});
