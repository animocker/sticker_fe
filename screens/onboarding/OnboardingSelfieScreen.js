import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

const OnboardingStartScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.processingText}>Processing selfies</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  processingText: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default OnboardingStartScreen;
