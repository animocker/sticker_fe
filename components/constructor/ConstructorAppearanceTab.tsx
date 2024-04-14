import React, { useState, useRef }  from "react";
import {StyleSheet, Dimensions, View, Text} from "react-native";
import AvatarService from "../../backend/AvatarService";
import {AnimationType, ElementType} from "../../backend/db/enum";
import {SwipablePanel} from "../ui/SwipablePanel";
import {ConstructorAppearanceMenu} from "./ConstructorAppearanceMenu";
import LottieView from "lottie-react-native";
import {ChangeElementCommand} from "../../backend/command-queue/Command";
import {Animation} from "@lottiefiles/lottie-js";

export const ConstructorAppearanceTab = () => {
  const animationRef = useRef<LottieView>(null);
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [lottie, setLottie] = useState<Animation>();

  AvatarService.getAnimationWatermelon(selectedAnimation).then(animation => {
    console.log("Animation received" + animation);
    setLottie(animation);}
  );

  const changeElement = (elementType, number) => {
    const request = {elementType, number} as ChangeElementCommand;
    AvatarService.changeElement(request);
    AvatarService.getAnimationWatermelon(selectedAnimation).then(animation => {
      animationRef.current?.pause();
      setLottie(animation);
      animationRef.current?.play();

      setTimeout(() => {
        animationRef.current?.play();
      }, 100);
    });
  };

  const changeSize = (elementType, changeSizePercent) => {
    console.log(elementType);
    console.log(changeSizePercent);
    // AvatarService.changeSize({elementType, changeSizePercent});
    // AvatarService.getAnimationWatermelon(selectedAnimation).then(animation => {
    //   animationRef.current?.pause();
    //   setLottie(animation);
    //   animationRef.current?.play();
    //
    //   setTimeout(() => {
    //     animationRef.current?.play();
    //   }, 100);
    // });
  };

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        {!lottie ? <Text>Loading...</Text> : <LottieView source={lottie} autoPlay style={styles.lottie}   ref={animationRef} />}
      </View>
      <View>
        <SwipablePanel>
          <ConstructorAppearanceMenu changeElement={changeElement} changeSize={changeSize} />
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
