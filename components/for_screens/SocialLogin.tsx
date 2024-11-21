import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SocialLogin() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Или зарегистрируйтесь через социальные сети</Text>
      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.button}>
          <Image source={require("../../assets/vk.png")} style={styles.imgSize} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image source={require("../../assets/apple.png")} style={styles.imgSize} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image source={require("../../assets/google.png")} style={styles.imgSize} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 312,
    height: 128,
    marginTop: 64,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonBox: {
    marginTop: 24,
    gap: 16,
    display: "flex",
    flexDirection: "row",
    width: 200,
  },
  button: {
    borderRadius: 100,
    width: 54,
    height: 54,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  imgSize: {
    width: 54,
    height: 54,
  },
});
