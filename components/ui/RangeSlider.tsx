import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import Slider from "react-native-slider";
import PropTypes from "prop-types";
import { styleAssets } from "../../styleAssets";

export const RangeSlider = ({ initialSize, changeSize, step = 1 }) => {
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
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
        minimumTrackTintColor={styleAssets.colorsPalette.primeBlue}
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
    marginBottom: 20,
    marginTop: 20,
  },
  thumb: {
    backgroundColor: styleAssets.colorsPalette.primeBlue,
    borderRadius: 20,
    elevation: 5,
    height: 40,
    shadowColor: styleAssets.colorsPalette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 40,
  },
  track: {
    backgroundColor: styleAssets.colorsPalette.white,
    borderRadius: 20,
    height: 24,
  },
});
