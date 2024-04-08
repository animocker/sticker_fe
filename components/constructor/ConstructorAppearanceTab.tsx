import React, { useState }  from "react";
import {StyleSheet, Dimensions, View, Text} from "react-native";
import AvatarService from "../../service/AvatarService";
import {AnimationType, ElementType} from "../../db/enum";
import {findByType} from "../../db/elements";
import {SwipablePanel} from "../ui/SwipablePanel";
import {ConstructorAppearanceMenu} from "./ConstructorAppearanceMenu";
import LottieView from "lottie-react-native";

export const ConstructorAppearanceTab = () => {
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [lottie, setLottie] = useState(AvatarService.getAnimation(selectedAnimation));

  const changeElement = (type, index) => {
    AvatarService.changeElement({type, index});
    setLottie(AvatarService.getAnimation(selectedAnimation));
  };

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView source={lottie} autoPlay style={styles.lottie} />
      </View>
      <View>
        <SwipablePanel>
          <ConstructorAppearanceMenu changeElement={changeElement} />
        </SwipablePanel>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: "100%"
  },
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