import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, ScrollView, Text } from "react-native";
import AvatarService from "../../backend/avatar/AvatarService";
import LottieView from "lottie-react-native";
import { AnimationType, ElementType } from "../../model/enum";
import { CharacterPicker } from "../../components/characters/CharacterPicker";
import { useNavigation } from "@react-navigation/native";
import { Animation } from "@lottiefiles/lottie-js";
import { ChangeElementCommand } from "../../model/ChangeStateCommand";
const MainScreen = () => {
  const navigation = useNavigation();

  const [selectedType, setSelectedType] = useState(ElementType.HAT);
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [inputValue, setInputValue] = useState(1);
  const [lottie, setLottie] = useState<Animation>();
  const [size, setSize] = useState(0);
  const [color, setColor] = useState("");

  const changeAnimation = (value: any) => {
    // setSelectedAnimation(value);
    // setLottie(AvatarService.getAvatar());
  };

  return (
    <ScrollView>
      <CharacterPicker />

      <Button title="Edit character" onPress={() => navigation.navigate("ConstructorScreen")} />

      {/*<View style={styles.lottieContainer}>*/}
      {/*  <LottieView source={lottie} autoPlay loop  style={styles.lottie} />*/}
      {/*</View>*/}
      {/*<View style={styles.block}>*/}
      {/*  <Picker*/}
      {/*    selectedValue={selectedType}*/}
      {/*    onValueChange={setSelectedType}*/}
      {/*  >*/}
      {/*    {Object.values(ElementType).map((value) => (*/}
      {/*      <Picker.Item key={value} label={value} value={value} />*/}
      {/*    ))}*/}
      {/*  </Picker>*/}
      {/*  <NumberInput inputValue={inputValue} setInputValue={changeElement} />*/}
      {/*</View>*/}
      {/*<View style={styles.block}>*/}
      {/*  <Picker*/}
      {/*    selectedValue={selectedAnimation}*/}
      {/*    onValueChange={changeAnimation}*/}
      {/*  >*/}
      {/*    {Object.values(AnimationType).map((value) => (*/}
      {/*      <Picker.Item key={value} label={value} value={value} />*/}
      {/*    ))}*/}
      {/*  </Picker>*/}
      {/*</View>*/}
      {/*<View style={styles.block}>*/}
      {/*  <Slider*/}
      {/*    style={styles.slider}*/}
      {/*    minimumValue={-50}*/}
      {/*    maximumValue={50}*/}
      {/*    step={1}*/}
      {/*    value={size}*/}
      {/*    onValueChange={changeSize}*/}
      {/*  />*/}
      {/*</View>*/}
      {/*<View style={styles.block}>*/}

      {/*  <ColorPicker*/}
      {/*    color={color}*/}
      {/*    onColorChange={changeColor}*/}
      {/*  />*/}
      {/*</View>*/}
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   block: {
//     marginBottom: 40
//   },
//   input: {
//     borderColor: "gray",
//     borderWidth: 1,
//     height: 40,
//     marginTop: 10,
//   },
//   lottie: {
//     height: 200,
//     width: 200
//   },
//   lottieContainer: {
//     height: 200,
//     width: 200
//   },
//   slider: {
//     height: 40,
//     marginTop: 10,
//     width: 200,
//   }
// });

export default MainScreen;
