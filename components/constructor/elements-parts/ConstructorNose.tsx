import React from "react";
import {ScrollView, TouchableOpacity, StyleSheet, Image} from "react-native";
import {elementsMenuStyles} from "../styles";
import {ElementType} from "../../../model/enum";
import PropTypes from "prop-types";

const NOSE_1 = require("../icons/nose/nose_1.png");
const NOSE_2 = require("../icons/nose/nose_2.png");
const NOSE_3 = require("../icons/nose/nose_3.png");
const NOSE_4 = require("../icons/nose/nose_4.png");
const NOSE_5 = require("../icons/nose/nose_5.png");

const NOSE_SETTINGS = [
  {icon: <Image source={NOSE_1} />, name: "nose_1"},
  {icon: <Image source={NOSE_2} />, name: "nose_2"},
  {icon: <Image source={NOSE_3} />, name: "nose_3"},
  {icon: <Image source={NOSE_4} />, name: "nose_4"},
  {icon: <Image source={NOSE_5} />, name: "nose_5"},
];

export const ConstructorNose = ({ changeElement }) => {
  return (
    <ScrollView contentContainerStyle={elementsMenuStyles.container}>
      {NOSE_SETTINGS.map((item, index) => (
        <TouchableOpacity key={index} style={elementsMenuStyles.button} onPress={() => changeElement(ElementType.NOSE, index + 1)}>
          {item.icon}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

ConstructorNose.propTypes = {
  changeElement: PropTypes.func.isRequired,
};