import React from "react";
import {ScrollView, TouchableOpacity, StyleSheet, Image} from "react-native";
import {elementsMenuStyles} from "../styles";
import {ElementType} from "../../../backend/db/enum";
import PropTypes from "prop-types";

const EYE_1 = require("../icons/eye/eye_1.png");
const EYE_2 = require("../icons/eye/eye_2.png");
const EYE_3 = require("../icons/eye/eye_3.png");
const EYE_4 = require("../icons/eye/eye_4.png");
const EYE_5 = require("../icons/eye/eye_5.png");
const EYE_6 = require("../icons/eye/eye_6.png");

const EYE_SETTINGS = [
  {icon: <Image source={EYE_1} />, name: "eye_1"},
  {icon: <Image source={EYE_2} />, name: "eye_2"},
  {icon: <Image source={EYE_3} />, name: "eye_3"},
  {icon: <Image source={EYE_4} />, name: "eye_4"},
  {icon: <Image source={EYE_5} />, name: "eye_5"},
  {icon: <Image source={EYE_6} />, name: "eye_6"},
];

export const ConstructorEye = ({ changeElement }) => {
  return (
    <ScrollView contentContainerStyle={elementsMenuStyles.container}>
      {EYE_SETTINGS.map((item, index) => (
        <TouchableOpacity key={index} style={elementsMenuStyles.button} onPress={() => changeElement(ElementType.HAIR, index + 1)}>
          {item.icon}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

ConstructorEye.propTypes = {
  changeElement: PropTypes.func.isRequired,
};