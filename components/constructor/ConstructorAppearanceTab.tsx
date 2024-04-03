import React, { useState }  from "react";
import {StyleSheet, Dimensions, View, Text} from "react-native";
import AvatarService from "../../service/AvatarService";
import {AnimationType, ElementType} from "../../types/enum";
import {findByType} from "../../service/elements";
import {SwipablePanel} from "../ui/SwipablePanel";
import {ConstructorAppearanceMenu} from "./ConstructorAppearanceMenu";

export const ConstructorAppearanceTab = () => {
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [lottie, setLottie] = useState(AvatarService.getAnimation(selectedAnimation));
  const [settingsHat, sesSettingsHat] = useState(findByType(ElementType.HAT));

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>constructor lottie</Text>
      </View>
      <View>
        <SwipablePanel>
          <ConstructorAppearanceMenu />
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
  content: {
    flexGrow: 1,
  },
});
