import React, { useState }  from "react";
import {StyleSheet, Dimensions, View, Text, Button} from "react-native";
import LottieView from "lottie-react-native";
import AvatarService from "../../service/AvatarService";
import {AnimationType, ElementType} from "../../db/enum";
import {findByType} from "../../db/elements";
import { SvgUri } from "react-native-svg";
export const ConstructorAppearanceTab = () => {
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [lottie, setLottie] = useState(AvatarService.getAnimation(selectedAnimation));
  const [settingsHat, sesSettingsHat] = useState(findByType(ElementType.HAT));

  return (
    <View>
      <View style={styles.lottieContainer}>
        <LottieView source={lottie} autoPlay style={styles.lottie} />
      </View>
      {settingsHat.slice(0, 4).map((hat, index) => (
        <Button
          key={index}
          title={`${hat.icon}`}
          onPress={() => console.log(`Button ${index + 1} pressed`)}
        >
          <SvgUri width="50" height="50" uri={hat.icon} />
        </Button>
      ))}
    </View>

  );
};

const styles = StyleSheet.create({
  lottie: {
    height: 300,
    overflow: "hidden",
    transform: [
      { scale: 2 },
      {translateY: 35}
    ],
    width: Dimensions.get("window").width * 0.7
  },
  lottieContainer: {
    alignSelf: "center",
    borderColor: "blue",
    borderWidth: 2,
    height: 300,
    overflow: "hidden",
    width: Dimensions.get("window").width * 0.7,
  },
});