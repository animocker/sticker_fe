import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/buttons/Button";
import { router } from "expo-router";
import Background from "../components/for_screens/Background";
import StartImageView from "../components/for_screens/ImageStartScreen";
import Logo from "../components/for_screens/Logo";
import MainImageView from "../components/for_screens/ImageMainScreen";

export default function Start() {
  const session = true;
  if (session) {
    return (
      <Background>
        <Logo marginBottom={40} />
        <MainImageView />
        <View style={styles.buttons}>
          <Button text="📷 Сделать селфи" onPress={() => router.push("auth/legal")} />
          <Button text="Создать вручную" onPress={() => router.push("auth/login")} />
        </View>
      </Background>
    );
  } else {
    return (
      <Background>
        <Logo marginBottom={65} />
        <StartImageView />
        <View style={styles.buttons}>
          <Button text="Регистрация" onPress={() => router.push("auth/legal")} />
          <Button text="Войти" onPress={() => router.push("auth/login")} />
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    gap: 24,
  },
});
