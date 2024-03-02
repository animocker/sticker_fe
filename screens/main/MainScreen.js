import React, { useState }  from "react";
import { View, Button, StyleSheet, Text, TextInput } from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import AvatarService from "../../service/AvatarService";
import LottieView from "lottie-react-native";
import {AnimationType, ElementType} from "../../db/enum";
import NumberInput from "../../components/ui/NumberInput";

const MainScreen = () => {
  const [selectedValue, setSelectedValue] = useState(ElementType.HAT);
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [inputValue, setInputValue] = useState(1);
  const [lottie, setLottie] = useState(AvatarService.getAnimation(selectedAnimation));
  const [size, setSize] = useState(50);

  const changeElement = () => {
    AvatarService.changeElement({elementType: selectedValue, number: inputValue});
    setLottie(AvatarService.getAnimation(selectedAnimation));
  };

  const changeAnimation = (value) => {
    setSelectedAnimation(value);
    AvatarService.getAnimation(selectedAnimation);
    setLottie(AvatarService.getAnimation(selectedAnimation));
  };

  const changeSize = (value) => {
    setSize(value);
    AvatarService.changeSize(value);
    AvatarService.changeSize({size: value});
  };

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView source={lottie} autoPlay loop  style={styles.lottie} />
      </View>

      <View style={styles.block}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={setSelectedValue}
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
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    marginBottom: 60
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
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
