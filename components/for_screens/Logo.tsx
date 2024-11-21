import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface LogoProps {
  marginBottom: number;
}

export default function Logo({ marginBottom }: LogoProps) {
  return (
    <View style={[styles.container, { marginBottom: marginBottom }]}>
      <Text style={styles.text}>AniMoker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 76,
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    color: "#ACFDF3",
    fontWeight: "700",
    fontSize: 50,
  },
});
