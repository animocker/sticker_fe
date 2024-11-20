import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/buttons/Button";
import { router } from "expo-router";
import Background from "../components/for_screens/Background";
import StartImageView from "../components/for_screens/ImageStartScreen";
import Logo from "../components/for_screens/Logo";

export default function Start() {
  // Сюда можно вставить логику главного меню, переход на него в если зарегестрирован
  return (
    <Background>
      <Logo />
      <StartImageView />
      <View style={styles.buttons}>
        <Button text="Регистрация" onPress={() => router.push("auth/legal")} />
        <Button text="Войти" onPress={() => router.push("auth/login")} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  buttons: {
    gap: 24,
  },
});
