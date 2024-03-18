import React, { useState }  from "react";
import {StyleSheet, Dimensions, View, Text, Button} from "react-native";
import LottieView from "lottie-react-native";
import AvatarService from "../../service/AvatarService";
import {AnimationType} from "../../db/enum";
export const ConstructorClothTab = () => {
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [lottie, setLottie] = useState(AvatarService.getAnimation(selectedAnimation));

  return (
    <View style={styles.lottieContainer}>
      <LottieView source={lottie} autoPlay style={styles.lottie} />
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
    borderColor: "blue",
    borderWidth: 2,
    height: 300,
    width: Dimensions.get("window").width * 0.7,
  },
});