import LottieView, { AnimationObject } from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import AvatarService from "../backend/avatar/AvatarService";
import { useMMKVBoolean } from "react-native-mmkv";

export function LottieWrapper() {
  const animationRef = useRef<LottieView>(null);
  const [lottie, setLottie] = useState<AnimationObject>();
  const [isNewAvatarAvailable] = useMMKVBoolean("isNewAvatarAvailable");

  useEffect(() => {
    if (isNewAvatarAvailable) {
      AvatarService.getAvatar().then((animation) => {
        setLottie(animation);
      });
    }
  }, [isNewAvatarAvailable]);

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
