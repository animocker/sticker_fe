import React, { useState }  from "react";
import { View, Button, StyleSheet, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AvatarService from "../../service/AvatarService";
import LottieView from "lottie-react-native";
import {AnimationType, ElementType} from "../../db/enum";

const MainScreen = () => {
  const [selectedValue, setSelectedValue] = useState(ElementType.HAT);
  const [selectedAnimation, setSelectedAnimation] = useState(AnimationType.IDLE);
  const [inputValue, setInputValue] = useState("");
  const [lottie, setLottie] = useState(AvatarService.getAnimation(AnimationType.IDLE));

  const changeElement = () => {
    AvatarService.changeElement({elementType: selectedValue, number: inputValue});
    setLottie(AvatarService.getAnimation(AnimationType.IDLE));
  };

  const changeAnimation = () => {
    console.log(selectedAnimation);
    AvatarService.getAnimation(selectedAnimation);
    setLottie(AvatarService.getAnimation(AnimationType.IDLE));
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
        <TextInput
          style={styles.input}
          onChangeText={setInputValue}
          value={inputValue}
          placeholder="Enter text"
        />
        <Button
          title="Change Element"
          onPress={changeElement}
        />
      </View>

      <View style={styles.block}>
        <Picker
          selectedValue={selectedAnimation}
          onValueChange={setSelectedAnimation}
        >
          {Object.values(AnimationType).map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
        <Button
          title="Change Animation"
          onPress={changeAnimation}
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
  }
});

export default MainScreen;
