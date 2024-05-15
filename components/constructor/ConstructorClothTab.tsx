import React, {useRef, useState} from "react";
import {StyleSheet, Dimensions, View, Text, Button} from "react-native";
import LottieView from "lottie-react-native";
import AvatarService from "../../backend/AvatarService";
import {AnimationType} from "../../model/enum";
import {SwipablePanel} from "../ui/SwipablePanel";
import {ConstructorClothMenu} from "./ConstructorClothMenu";
import {Animation} from "@lottiefiles/lottie-js";

export const ConstructorClothTab = () => {
  const animationRef = useRef<LottieView>(null);
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [lottie, setLottie] = useState<Animation>();

  AvatarService.getAnimation(selectedAnimation).then(animation => {
    console.log("Animation received" + animation);
    setLottie(animation);
  });


  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        {!lottie ? <Text>Loading...</Text> : <LottieView source={lottie} autoPlay style={styles.lottie}   ref={animationRef} />}
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
    height: 300,
    width: Dimensions.get("window").width * 0.7,
  },
});
