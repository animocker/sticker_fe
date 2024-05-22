import React, { useState, useRef } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import AvatarService from "../../backend/avatar/AvatarService";
import { AnimationType, ElementType } from "../../model/enum";
import { SwipablePanel } from "../ui/SwipablePanel";
import { ConstructorAppearanceMenu } from "./ConstructorAppearanceMenu";
import LottieView from "lottie-react-native";
import { ChangeColorCommand, ChangeElementCommand, ChangeSizeCommand, CommandType } from "../../model/ChangeStateCommand";
import { Animation } from "@lottiefiles/lottie-js";
import { Color } from "../../model/Config";

export const ConstructorAppearanceTab = () => {
  const animationRef = useRef<LottieView>(null);
  const [lottie, setLottie] = useState<Animation>();
  // TODO default 0. get saved value from backend
  const [selectedValues, setSelectedValues] = useState({
    [ElementType.HEAD]: 0,
  });

  AvatarService.getAvatar().then((animation) => {
    setLottie(animation);
  });

  const reloadAnimation = () => {
    AvatarService.getAvatar().then((animation) => {
      animationRef.current?.pause();
      setLottie(animation);
      animationRef.current?.play();
    });
  };

  const changeElement = (elementType, number) => {
    setSelectedValues({ ...selectedValues, [elementType]: number });
    const request = new ChangeElementCommand(elementType, number + 1);
    AvatarService.changeElement(request);
    reloadAnimation();
  };

  const changeSize = (elementType: ElementType, sizePercent: number) => {
    AvatarService.changeSize(new ChangeSizeCommand(elementType, sizePercent));
    reloadAnimation();
  };

  const changeColor = (elementType: ElementType, color: Color) => {
    AvatarService.changeColor(new ChangeColorCommand(elementType, color.id, selectedValues[elementType]));
    reloadAnimation();
  };

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        {!lottie ? <Text>Loading...</Text> : <LottieView source={lottie} autoPlay style={styles.lottie} ref={animationRef} />}
      </View>
      <View style={styles.menuContainer}>
        {/*<SwipablePanel>*/}
        <ConstructorAppearanceMenu selectedValues={selectedValues} changeElement={changeElement} changeSize={changeSize} changeColor={changeColor} />
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
    width: Dimensions.get("window").width * 0.7,
  },
  menuContainer: {
    flexGrow: 1,
  },
});
