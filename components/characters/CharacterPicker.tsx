import React, {useEffect, useState} from "react";
import {StyleSheet, Dimensions, View, Text, Button} from "react-native";
import LottieView from "lottie-react-native";
import AvatarService from "../../service/AvatarService";
import {AnimationType} from "../../types/enum";
import {Animation} from "@lottiefiles/lottie-js";
export const CharacterPicker = () => {
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [lottie, setLottie] = useState<Animation>();

  AvatarService.getAnimation(selectedAnimation).then(animation => {
    console.log("Animation received" + animation);
    setLottie(animation);}
  );

  if (!lottie) {
    return <Text>Loading...</Text>;
  }
  return (

    <View style={styles.lottieContainer}>
      <LottieView source={lottie} autoPlay loop  style={styles.lottie} />
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
