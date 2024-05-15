import React, { useState, useRef }  from "react";
import {StyleSheet, Dimensions, View, Text} from "react-native";
import AvatarService from "../../backend/AvatarService";
import {AnimationType, ElementType} from "../../model/enum";
import {SwipablePanel} from "../ui/SwipablePanel";
import {ConstructorAppearanceMenu} from "./ConstructorAppearanceMenu";
import LottieView from "lottie-react-native";
import {
  ChangeColorCommand,
  ChangeElementCommand,
  ChangeSizeCommand,
} from "../../model/Command";
import {Animation} from "@lottiefiles/lottie-js";

export const ConstructorAppearanceTab = () => {
  const animationRef = useRef<LottieView>(null);
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [lottie, setLottie] = useState<Animation>();

  AvatarService.getAvatar().then(animation => {
    console.log("Animation received" + animation);
    setLottie(animation);}
  );

  const reloadAnimation = () => {
    AvatarService.getAvatar().then(animation => {
      animationRef.current?.pause();
      setLottie(animation);
      animationRef.current?.play();

      setTimeout(() => {
        animationRef.current?.play();
      }, 100);
    });
  };

  const changeElement = (elementType, number) => {
    const request = {elementType, number} as ChangeElementCommand;
    console.log(request);
    AvatarService.changeElement(request);
    reloadAnimation();
  };

  const changeSize = (elementType: ElementType, sizePercent: number) => {
    AvatarService.changeSize(
        {elementType, sizePercent} as ChangeSizeCommand
    );
    reloadAnimation();
  };

  const changeColor = (elementType: ElementType, color: string) => {
    AvatarService.changeColor(
        {elementType, color} as ChangeColorCommand
    );
    reloadAnimation();
  };

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        {!lottie ? <Text>Loading...</Text> : <LottieView source={lottie} autoPlay style={styles.lottie}   ref={animationRef} />}
      </View>
      <View  style={styles.menuContainer}>
        {/*<SwipablePanel>*/}
        <ConstructorAppearanceMenu changeElement={changeElement} changeSize={changeSize} changeColor={changeColor} />
        {/*</SwipablePanel>*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },
  lottie: {
    height: 300,
    width: Dimensions.get("window").width * 0.7,
  },
  lottieContainer: {
    alignSelf: "center",
    height: 300,
    transform: [{ scale: 2 }, { translateY: 40 }],
    width: Dimensions.get("window").width * 0.7
  },
  menuContainer: {
    flexGrow: 1
  }
});
