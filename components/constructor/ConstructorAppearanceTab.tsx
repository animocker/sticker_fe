import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import AvatarService, { useAvatar } from "../../backend/avatar/AvatarService";
import { ElementType } from "../../model/enum";
import { ConstructorAppearanceMenu } from "./ConstructorAppearanceMenu";
import LottieView, { AnimationObject } from "lottie-react-native";
import { ChangeColorCommand, ChangeElementCommand, ChangeSizeCommand } from "../../model/ChangeStateCommand";
import { SETTINGS_APPEARANCE } from "./types";
import { ElementTypeAndNumber } from "../../model/ElementTypeAndNumber";
import { LottieWrapper } from "../LottieWrapper";
import ElementsService, { Color, ColorSet } from "../../backend/ElementsService";

export const ConstructorAppearanceTab = () => {
  const animationRef = useRef<LottieView>(null);
  const [lottie, setLottie] = useState<AnimationObject>();
  const [selectedValues, setSelectedValues] = useState({});

  useEffect(() => {
    AvatarService.getState().then((state) => {
      const newSelectedValues = {};
      for (const key of SETTINGS_APPEARANCE) {
        const selectedIndex = state.elements.get(key);
        const colorSetId = state.elementColorSet.get(key);
        const colorSet = ElementsService.getColorSetById(colorSetId);
        newSelectedValues[key] = {
          selectedIndex: selectedIndex - 1,
          size: state.elementSize.get(key),
          colorSet,
        };
      }
      setSelectedValues(newSelectedValues);
    });
  }, []);

  const reloadAnimation = () => {
    AvatarService.getAvatar().then((animation) => {
      animationRef.current?.pause();
      setLottie(animation);
      animationRef.current?.play();
    });
  };

  const changeElement = (elementType, number) => {
    setSelectedValues({
      ...selectedValues,
      [elementType]: { ...selectedValues[elementType], selectedIndex: number },
    });
    const request = new ChangeElementCommand(elementType, number);
    AvatarService.executeCommand(request);
    //reloadAnimation();
  };

  const changeSize = (elementType: ElementType, sizePercent: number) => {
    setSelectedValues({
      ...selectedValues,
      [elementType]: { ...selectedValues[elementType], size: sizePercent },
    });
    AvatarService.executeCommand(new ChangeSizeCommand(elementType, sizePercent));
    //reloadAnimation();
  };

  const changeColor = (elementType: ElementType, color: ColorSet) => {
    setSelectedValues({
      ...selectedValues,
      [elementType]: { ...selectedValues[elementType], colorSet: color.id },
    });
    AvatarService.executeCommand(new ChangeColorCommand(elementType, selectedValues[elementType].selectedIndex, color.id));
    //reloadAnimation();
  };

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieWrapper />
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
