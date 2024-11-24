import LottieView, { AnimationObject } from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import AvatarService from "../backend/avatar/AvatarService";

export function LottieWrapper() {
  const animationRef = useRef<LottieView>(null);
  const [lottie, setLottie] = useState<AnimationObject>();

  useEffect(() => {
    if (AvatarService.isNewAvailable) {
      AvatarService.getAvatar().then((animation) => {
        setLottie(animation);
      });
    }
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
