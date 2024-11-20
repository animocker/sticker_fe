import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const StartImageView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LinearGradient colors={["#FFBEBE", "#7019FF"]} style={[styles.headerBox, styles.firstHeader]}>
          <Text style={styles.headerText}>Создай стикерпак</Text>
        </LinearGradient>
        <LinearGradient colors={["#A2F4FF", "#7019FF"]} style={[styles.headerBox, styles.secondHeader]}>
          <Text style={styles.headerText}>из своего селфи</Text>
        </LinearGradient>
        <Image
          source={require("../../assets/personInStartScreen.png")} // Убедитесь, что добавили аватарку в проект
          style={styles.avatar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  avatar: {
    height: 350,
    position: "absolute",
    marginTop: 65,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  header: {
    alignItems: "center",
    height: 400,
  },
  headerBox: {
    borderRadius: 145,
    width: 320,
    height: 82,
    alignItems: "center",
    justifyContent: "center",
  },
  firstHeader: {
    transform: [{ rotate: "-9deg" }],
  },
  secondHeader: {
    transform: [{ rotate: "-2deg" }],
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
});

export default StartImageView;
