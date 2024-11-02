import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import AvatarService from "../../backend/avatar/AvatarService";
import { ElementType } from "../../model/enum";
import { ConstructorAppearanceMenu } from "./ConstructorAppearanceMenu";
import LottieView from "lottie-react-native";
import { ChangeColorCommand, ChangeElementCommand, ChangeSizeCommand } from "../../model/ChangeStateCommand";
import { Animation } from "@lottiefiles/lottie-js";
import { Color } from "../../model/Config";
import { SETTINGS_APPEARANCE } from "./types";
import { ElementTypeAndNumber } from "../../model/ElementTypeAndNumber";
import ElementConfigService from "../../backend/ElementConfigService";

export const ConstructorAppearanceTab = () => {
  const animationRef = useRef<LottieView>(null);
  const [lottie, setLottie] = useState<Animation>();
  const [selectedValues, setSelectedValues] = useState({});

  useEffect(() => {
    AvatarService.getState().then((state) => {
      const newSelectedValues = {};
      for (const key of SETTINGS_APPEARANCE) {
        const selectedIndex = state.elements.get(key);
        const colorSetId = state.elementColorSet.get(key)
          ? state.elementColorSet.get(key)
          : state.elementColorSet.get(new ElementTypeAndNumber(key, selectedIndex).toString());
        const colorSet = ElementConfigService.getColorSetById(colorSetId);
        newSelectedValues[key] = {
          selectedIndex: selectedIndex - 1,
          size: state.elementSize.get(key),
          colorSet,
        };
      }
      setSelectedValues(newSelectedValues);
    });
  }, []);

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
    setSelectedValues({
      ...selectedValues,
      [elementType]: { ...selectedValues[elementType], selectedIndex: number },
    });
    const request = new ChangeElementCommand(elementType, number + 1);
    AvatarService.changeElement(request);
    reloadAnimation();
  };

  const changeSize = (elementType: ElementType, sizePercent: number) => {
    setSelectedValues({
      ...selectedValues,
      [elementType]: { ...selectedValues[elementType], size: sizePercent },
    });
    AvatarService.changeSize(new ChangeSizeCommand(elementType, sizePercent));
    reloadAnimation();
  };

  const changeColor = (elementType: ElementType, color: Color) => {
    setSelectedValues({
      ...selectedValues,
      [elementType]: { ...selectedValues[elementType], colorSet: color.id },
    });
    AvatarService.changeColor(new ChangeColorCommand(elementType, color.id, selectedValues[elementType].selectedIndex));
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
