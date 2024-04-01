import React, { useState, useRef, useEffect }  from "react";
import {StyleSheet, Dimensions, View, Text, Button, PanResponder, Animated} from "react-native";
import LottieView from "lottie-react-native";
import AvatarService from "../../service/AvatarService";
import {AnimationType, ElementType} from "../../db/enum";
import {findByType} from "../../db/elements";
import Svg, { Circle, Rect } from "react-native-svg";
import { SvgXml } from "react-native-svg";

export const ConstructorAppearanceTab = () => {
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [lottie, setLottie] = useState(AvatarService.getAnimation(selectedAnimation));
  const [settingsHat, sesSettingsHat] = useState(findByType(ElementType.HAT));
  const [isFullMenuView, setIsFullMenuView] = useState(true);
  const menuHeight = useRef(new Animated.Value(300)).current; // Initial height

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          setIsFullMenuView(false);
          Animated.timing(menuHeight, {
            toValue: 150,
            duration: 500,
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dy < 0) {
          setIsFullMenuView(true);
          Animated.timing(menuHeight, {
            toValue: 300,
            duration: 500,
            useNativeDriver: false,
          }).start();
        }
      }
    }),
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>tab</Text>
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.menu, { height: menuHeight }]}
      />
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
  menu: {
    backgroundColor: "blue",
    width: "100%",
  },
});