import React from "react";
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, Image} from "react-native";
import {RangeSlider} from "../../ui/RangeSlider";
import PropTypes from "prop-types";
import {ElementType} from "../../../backend/db/enum";
import {ColorListPicker} from "../../ui/ColorListPicker";
import {elementsMenuStyles} from "../styles";
import {styleAssets} from "../../../styleAssets";

const HEAD_1 = require("../icons/head/head_1.png");
const HEAD_2 = require("../icons/head/head_2.png");
const HEAD_3 = require("../icons/head/head_3.png");
const HEAD_4 = require("../icons/head/head_4.png");
const HEAD_5 = require("../icons/head/head_5.png");
const HEAD_6 = require("../icons/head/head_6.png");

const HEAD_SETTINGS = [
  {icon: <Image source={HEAD_1} />, name: "head_1"},
  {icon: <Image source={HEAD_2} />, name: "head_2"},
  {icon: <Image source={HEAD_3} />, name: "head_3"},
  {icon: <Image source={HEAD_4} />, name: "head_4"},
  {icon: <Image source={HEAD_5} />, name: "head_5"},
  {icon: <Image source={HEAD_6} />, name: "head_6"},
];

export const ConstructorHead = ({changeElement, changeSize, changeColor}) => {

  const changeSizeHandle = (size: number) => {
    changeSize(ElementType.HEAD, size);
  };

  const changeColorHandle = (color: string) => {
    changeColor(ElementType.HEAD, color);
  };

  const colorsList =  ["black", "red", "#ffffff"];

  return (
    <View>
      <ScrollView contentContainerStyle={elementsMenuStyles.container}>
        {HEAD_SETTINGS.map((item, index) => (
          <TouchableOpacity key={index} style={elementsMenuStyles.button} onPress={() => changeElement(ElementType.HEAD, index + 1)}>
            {item.icon}
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/*<RangeSlider initialSize={0} changeSize={changeSizeHandle}  />*/}
      {/*<ColorListPicker colors={colorsList} changeColor={changeColorHandle} />*/}
    </View>
  );
};

ConstructorHead.propTypes = {
  changeElement: PropTypes.func.isRequired,
  changeSize: PropTypes.func.isRequired,
  changeColor: PropTypes.func.isRequired,
};