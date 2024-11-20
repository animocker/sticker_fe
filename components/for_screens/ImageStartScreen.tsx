import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const StartImageView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LinearGradient colors={["#FFBEBE", "#7019FF"]}>
          <Text style={styles.headerText}>Создай стикерпак</Text>
        </LinearGradient>
        <LinearGradient colors={["#A2F4FF", "#7019FF"]}>
          <Text style={styles.headerText}>из своего селфи</Text>
        </LinearGradient>
      </View>

      <View style={styles.avatarContainer}>
        {/* Здесь можно добавить аватарку или анимацию */}
        {/* <Image
          source={require("./avatar-placeholder.png")} // Убедитесь, что добавили аватарку в проект
          style={styles.avatar}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  avatar: {
    backgroundColor: "#ffffff",
    borderRadius: 50,
    height: 100,
    width: 100, // Заглушка под аватар
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
});

export default StartImageView;
