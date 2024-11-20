import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const AuthLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigation.navigate("OnboardingStart");
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="Password" secureTextEntry />
      <Button title="LOGIN" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default AuthLoginScreen;
