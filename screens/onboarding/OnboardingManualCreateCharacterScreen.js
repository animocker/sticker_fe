import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OnboardingManualCreateCharacterScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Constructor</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default OnboardingManualCreateCharacterScreen;