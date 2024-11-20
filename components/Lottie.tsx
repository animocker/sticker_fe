import LottieView from "lottie-react-native";
import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Animation } from "@lottiefiles/lottie-js";
import AvatarService from "../backend/avatar/AvatarService";

export function Lottie() {
  const animationRef = useRef<LottieView>(null);
  const [lottie, setLottie] = useState<Animation>();

  AvatarService.getAvatar().then((animation) => {
    console.log("Animation received" + animation);
    setLottie(animation);
  });

  return (
    <View style={styles.lottieContainer}>
      {!lottie ? <Text>Loading...</Text> : <LottieView source={lottie} autoPlay style={styles.lottie} ref={animationRef} />}
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    height: 300,
    width: Dimensions.get("window").width * 0.7,
  },
  lottieContainer: {
    alignSelf: "center",
    height: 300,
    width: Dimensions.get("window").width * 0.7,
  },
});
