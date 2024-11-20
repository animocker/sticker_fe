import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps {
  text: string;
  onPress: () => void;
}

export default function Button({ text, onPress }: ButtonProps) {
  return (
    <LinearGradient colors={["#007DF8", "#369AFD"]} style={styles.background}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#007DF8",
    borderRadius: 26,
    //height: 56,
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: 312,
    borderWidth: 3,
    borderColor: "#1E10BE",
    borderStyle: "solid",
  },
  text: {
    color: "white",
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
    textDecorationColor: "white",
  },
});
