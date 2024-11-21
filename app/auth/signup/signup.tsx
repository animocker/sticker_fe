/* eslint-disable max-len */
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import Background from "../../../components/for_screens/Background";
import Logo from "../../../components/for_screens/Logo";
import EyePassword from "../../../components/buttons/EyePassword";
import SocialLogin from "../../../components/for_screens/SocialLogin";

export default function Login() {
  const [isPasswordVisibleFirst, setPasswordVisibleFirst] = useState(false);
  const [isPasswordVisibleSecond, setPasswordVisibleSecond] = useState(false);
  return (
    <Background>
      <Logo marginBottom={65} />
      <Text style={styles.title}>Регистрация</Text>
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={() => console.log("edit input")}
      />
      <Text style={styles.text}>Password</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={!isPasswordVisibleFirst}
          onChangeText={() => console.log("edit input")}
        />
        <View style={styles.positionEyes}>
          <EyePassword isOpenEye={isPasswordVisibleFirst} onPress={() => setPasswordVisibleFirst(!isPasswordVisibleFirst)} />
        </View>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Repeat your password"
          secureTextEntry={!isPasswordVisibleSecond}
          onChangeText={() => console.log("edit input")}
        />
        <View style={styles.positionEyes}>
          <EyePassword isOpenEye={isPasswordVisibleSecond} onPress={() => setPasswordVisibleSecond(!isPasswordVisibleSecond)} />
        </View>
      </View>
      <SocialLogin />
    </Background>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38.4,
    marginBottom: 8,
  },
  text: {
    fontSize: 24,
    fontWeight: "500",
    width: 312,
    color: "white",
    marginTop: 24,
  },
  input: {
    width: 312,
    height: 48,
    borderRadius: 12,
    backgroundColor: "white",
    padding: 15,
    fontSize: 16,
    lineHeight: 19.2,
    fontWeight: "500",
    color: "#b8b8b8",
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#b8b8b8",
  },
  positionEyes: {
    position: "absolute",
    top: 21,
    left: 273,
  },
});
