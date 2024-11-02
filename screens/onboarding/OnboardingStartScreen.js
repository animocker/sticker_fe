import React from "react";
import PropTypes from "prop-types";
import { View, Button, StyleSheet, Text } from "react-native";

const OnboardingStartScreen = ({ navigation }) => {
  const handleSelfie = () => {
    console.log("Make selfie button pressed");
    navigation.navigate("OnboardingSelfie");
  };

  const handleMake = () => {
    console.log("Make button pressed");
    navigation.navigate("OnboardingManualCreateCharacter");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your first character</Text>
      <Button title="Take a selfie" onPress={handleSelfie} />
      <Button title="Create manually" onPress={handleMake} />
    </View>
  );
};

OnboardingStartScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default OnboardingStartScreen;
