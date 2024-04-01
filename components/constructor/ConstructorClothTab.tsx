import React, { useState }  from "react";
import {StyleSheet, Dimensions, View, Text, Button} from "react-native";
import LottieView from "lottie-react-native";
import AvatarService from "../../service/AvatarService";
import {AnimationType} from "../../db/enum";
import {SwipablePanel} from "../ui/SwipablePanel";
import {ConstructorClothMenu} from "./ConstructorClothMenu";

export const ConstructorClothTab = () => {
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [lottie, setLottie] = useState(AvatarService.getAnimation(selectedAnimation));

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.lottieContainer}>
          <LottieView source={lottie} autoPlay style={styles.lottie} />
        </View>
      </View>
      <View>
        <SwipablePanel>
          <ConstructorClothMenu />
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
  lottie: {
    height: 300,
    width: Dimensions.get("window").width * 0.7,
  },
  lottieContainer: {
    alignSelf: "center",
    borderColor: "blue",
    borderWidth: 2,
    height: 300,
    width: Dimensions.get("window").width * 0.7,
  },
  menu: {
    backgroundColor: "blue",
    width: "100%",
  },
});