import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import AvatarService from "../../service/AvatarService";
import LottieView from "lottie-react-native";
import {ElementType} from "../../db/enum";

const AuthStartScreen = ({ navigation }) => {
  AvatarService.changeElement(ElementType.GLASSES, 2);
  let lottie = AvatarService.getAnimation("STATIC");

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView source={lottie} autoPlay loop  style={styles.lottie} />
      </View>

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
  lottie: {
    height: 200,
    width: 200
  },
  lottieContainer: {
    height: 200,
    width: 200
  }
});

export default AuthStartScreen;
