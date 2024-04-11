import React, { useState, useRef }  from "react";
import {StyleSheet, Dimensions, View, Text} from "react-native";
import AvatarService from "../../service/AvatarService";
import {AnimationType, ElementType} from "../../types/enum";
import {SwipablePanel} from "../ui/SwipablePanel";
import {ConstructorAppearanceMenu} from "./ConstructorAppearanceMenu";
import LottieView from "lottie-react-native";
import {ChangeElementCommand} from "../../service/command-queue/Command";
import {Animation} from "@lottiefiles/lottie-js";

export const ConstructorAppearanceTab = () => {
  const animationRef = useRef<LottieView>(null);
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [lottie, setLottie] = useState<Animation>();

  AvatarService.getAnimation(selectedAnimation).then(animation => {
    console.log("Animation received" + animation);
    setLottie(animation);}
  );

  const changeElement = (elementType, number) => {
    const request = {elementType, number} as ChangeElementCommand;
    AvatarService.changeElement(request);
    AvatarService.getAnimation(selectedAnimation).then(animation => {
      console.log(animation);

      animationRef.current?.pause();
      setLottie(animation);
      animationRef.current?.play();

      setTimeout(() => {
        animationRef.current?.play();
      }, 100);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        {!lottie ? <Text>Loading...</Text> : <LottieView source={lottie} autoPlay style={styles.lottie}   ref={animationRef} />}
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
