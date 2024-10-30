import React, { useRef } from "react";
import { StyleSheet, Animated, PanResponder, Text } from "react-native";

export const SwipablePanel = ({ children }) => {
  const MENU_HEIGHT = {
    min: 100,
    max: 450,
  };
  const menuHeight = useRef(new Animated.Value(MENU_HEIGHT.max)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.timing(menuHeight, {
            toValue: MENU_HEIGHT.min,
            duration: 300,
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dy < 0) {
          Animated.timing(menuHeight, {
            toValue: MENU_HEIGHT.max,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View {...panResponder.panHandlers} style={[styles.menu, { height: menuHeight }]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menu: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
  },
});
