import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Logo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AniMoker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 76,
    marginTop: 60,
    marginBottom: 65,
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
