import React, { useState }  from "react";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import AvatarService from "../../service/AvatarService";
import LottieView from "lottie-react-native";
import {AnimationType, ElementType} from "../../db/enum";
import NumberInput from "../../components/ui/NumberInput";
import ColorPicker from "react-native-wheel-color-picker";

const MainScreen = () => {
  const [selectedType, setSelectedType] = useState(ElementType.HAT);
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [inputValue, setInputValue] = useState(1);
  const [lottie, setLottie] = useState(AvatarService.getAnimation(selectedAnimation));
  const [size, setSize] = useState(50);
  const [color, setColor] = useState("");

  const changeElement = () => {
    AvatarService.changeElement({elementType: selectedType, number: inputValue});
    setLottie(AvatarService.getAnimation(selectedAnimation));
  };

  const changeAnimation = (value) => {
    setSelectedAnimation(value);
    AvatarService.getAnimation(selectedAnimation);
    setLottie(AvatarService.getAnimation(selectedAnimation));
  };

  const changeSize = (value) => {
    setSize(value);
    AvatarService.changeSize({elementType: selectedType, number: size});
    setLottie(AvatarService.getAnimation(selectedAnimation));
  };

  const changeColor = (value) => {
    setColor(value);
    AvatarService.changeColor({elementType: selectedType, color});
    setLottie(AvatarService.getAnimation(selectedAnimation));
  };

  return (
    <ScrollView>
      <View style={styles.lottieContainer}>
        <LottieView source={lottie} autoPlay loop  style={styles.lottie} />
      </View>

      <View style={styles.block}>
        <Picker
          selectedValue={selectedType}
          onValueChange={setSelectedType}
        >
          {Object.values(ElementType).map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
        <NumberInput inputValue={inputValue} setInputValue={setInputValue} />
        <Button
          title="Change Element"
          onPress={changeElement}
        />
      </View>

      <View style={styles.block}>
        <Picker
          selectedValue={selectedAnimation}
          onValueChange={changeAnimation}
        >
          {Object.values(AnimationType).map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
      </View>

      <View style={styles.block}>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={100}
          step={1}
          value={size}
          onValueChange={changeSize}
        />
      </View>
      <View style={styles.block}>

        <ColorPicker
          color={color}
          onColorChange={changeColor}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  block: {
    marginBottom: 40
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    height: 40,
    marginTop: 10,
  },
  lottie: {
    height: 200,
    width: 200
  },
  lottieContainer: {
    height: 200,
    width: 200
  },
  slider: {
    height: 40,
    marginTop: 10,
    width: 200,
  }
});

export default MainScreen;
