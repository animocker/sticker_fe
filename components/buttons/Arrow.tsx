/* eslint-disable indent */
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps {
  side: "left" | "right";
  onPress: () => void;
}

export default function Button({ side, onPress }: ButtonProps) {
  function getArrow() {
    switch (side) {
      case "left":
        return "◀";
      case "right":
        return "▶";
      default:
        return "🚫";
    }
  }
  return (
    <LinearGradient colors={["#007DF8", "#369AFD"]} style={styles.background}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>{getArrow()}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "purple",
    borderColor: "black",
    borderRadius: 24,
    height: 64,
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: 64,
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
