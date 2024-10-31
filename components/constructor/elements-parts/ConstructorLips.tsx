import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { elementsMenuStyles } from "../styles";
import { ElementType } from "../../../model/enum";
import PropTypes from "prop-types";

const LIPS_1 = require("../icons/lips/lips_1.png");
const LIPS_2 = require("../icons/lips/lips_2.png");
const LIPS_3 = require("../icons/lips/lips_3.png");
const LIPS_4 = require("../icons/lips/lips_4.png");
const LIPS_5 = require("../icons/lips/lips_5.png");

const LIPS_SETTINGS = [
  { icon: <Image source={LIPS_1} />, name: "lips_1" },
  { icon: <Image source={LIPS_2} />, name: "lips_2" },
  { icon: <Image source={LIPS_3} />, name: "lips_3" },
  { icon: <Image source={LIPS_4} />, name: "lips_4" },
  { icon: <Image source={LIPS_5} />, name: "lips_5" },
];

export const ConstructorLips = ({ changeElement }) => {
  return (
    <ScrollView contentContainerStyle={elementsMenuStyles.container}>
      {LIPS_SETTINGS.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={elementsMenuStyles.button} 
          onPress={() => changeElement(ElementType.MOUTH, index + 1)}
        >
          {item.icon}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

ConstructorLips.propTypes = {
  changeElement: PropTypes.func.isRequired,
};
