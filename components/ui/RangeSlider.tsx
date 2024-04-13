import {View, StyleSheet} from "react-native";
import React, {useState} from "react";
import Slider from "@react-native-community/slider";
import PropTypes from "prop-types";


export const RangeSlider = ({initialSize, changeSize, step = 1}) => {
  const [size, setSize] = useState(initialSize);

  return (
    <View>
      <Slider
        style={styles.slider}
        minimumValue={-50}
        maximumValue={50}
        step={step}
        value={size}
        onSlidingComplete={changeSize}
      />
    </View>
  );
};

RangeSlider.propTypes = {
  changeSize: PropTypes.func.isRequired,
  initialSize: PropTypes.number.isRequired,
  step: PropTypes.number,
};


const styles = StyleSheet.create({
  slider: {
    height: 100,
    marginTop: 10,
    width: 200,
  }
});