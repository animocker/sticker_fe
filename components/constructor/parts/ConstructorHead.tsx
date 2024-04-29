import React from "react";
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from "react-native";
import {RangeSlider} from "../../ui/RangeSlider";
import PropTypes from "prop-types";
import {ElementType} from "../../../backend/db/enum";
import {ColorListPicker} from "../../ui/ColorListPicker";
export const ConstructorHead = ({changeSize, changeColor}) => {

  const changeSizeHandle = (size) => {
    changeSize(ElementType.HEAD, size);
  };

  const changeColorHandle = (color) => {
    changeColor(ElementType.HEAD, color);
  };

  const colorsList =  ["black", "red", "#ffffff"];

  return (
    <View>
      <RangeSlider initialSize={0} changeSize={changeSizeHandle}  />
      <ColorListPicker colors={colorsList} changeColor={changeColorHandle} />
    </View>
  );
};

ConstructorHead.propTypes = {
  changeSize: PropTypes.func.isRequired,
};
