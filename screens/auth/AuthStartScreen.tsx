import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

const AuthStartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Sign up" onPress={() => navigation.navigate("AuthLegal")} />
      <Button title="Login" onPress={() => navigation.navigate("AuthLogin")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default AuthStartScreen;
