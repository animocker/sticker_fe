import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const MainImageView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Создайте первого персонажа</Text>
      <Image source={require("../../assets/camera.png")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 48,
    fontWeight: "900",
    color: "white",
    lineHeight: 57.6,
    textAlign: "center",
    width: 328,
    marginBottom: 25,
  },
  image: {
    marginBottom: 40,
  },
});

export default MainImageView;
