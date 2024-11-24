import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { RangeSlider } from "../../ui/RangeSlider";
import PropTypes from "prop-types";
import { ElementType } from "../../../model/enum";
import { elementsMenuStyles } from "../styles";
import { CommonConstructorParts } from "../common-parts/CommonConstructorParts";
import { filterSettings } from "../helpers";

const HEAD_1 = require("../icons/head/1.png");
const HEAD_2 = require("../icons/head/2.png");
const HEAD_3 = require("../icons/head/3.png");
const HEAD_4 = require("../icons/head/4.png");
const HEAD_5 = require("../icons/head/5.png");
const HEAD_6 = require("../icons/head/6.png");

const HEAD_SETTINGS = [
  { icon: <Image source={HEAD_1} />, name: "head_1" },
  { icon: <Image source={HEAD_2} />, name: "head_2" },
  { icon: <Image source={HEAD_3} />, name: "head_3" },
  { icon: <Image source={HEAD_4} />, name: "head_4" },
  { icon: <Image source={HEAD_5} />, name: "head_5" },
  { icon: <Image source={HEAD_6} />, name: "head_6" },
];

export const ConstructorHead = ({ changeElement, changeSize, changeColor, settings, selectedValue }) => {
  const changeElementHandle = (index: number) => {
    changeElement(ElementType.HEAD, index);
  };

  const changeSizeHandle = (size: number) => {
    changeSize(ElementType.HEAD, size);
  };

  const changeColorHandle = (color: string) => {
    changeColor(ElementType.HEAD, color);
  };

  return (
    <View>
      {settings && Object.keys(settings)?.length > 0 && (
        <View>
          <View>
            <CommonConstructorParts
              selectedValue={selectedValue}
              settings={filterSettings(settings, selectedValue)}
              changeSizeHandle={changeSizeHandle}
              changeColorHandle={changeColorHandle}
            />
          </View>
        </View>
      )}
      <ScrollView contentContainerStyle={elementsMenuStyles.container}>
        {HEAD_SETTINGS.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[elementsMenuStyles.button, selectedValue?.selectedIndex === index && elementsMenuStyles.buttonSelected]}
            onPress={() => changeElementHandle(index)}
          >
            {item.icon}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
