import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, Text, Button } from "react-native";
import LottieView, { AnimationObject } from "lottie-react-native";
import AvatarService from "../../backend/avatar/AvatarService";
import { AnimationType } from "../../model/enum";
export const CharacterPicker = () => {
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [lottie, setLottie] = useState<AnimationObject>();

  AvatarService.getAvatar().then((animation) => {
    console.log("Animation received" + animation);
    setLottie(animation);
  });

  if (!lottie) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.lottieContainer}>
      <LottieView source={lottie} autoPlay loop style={styles.lottie} />
    </View>
  );
};

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
