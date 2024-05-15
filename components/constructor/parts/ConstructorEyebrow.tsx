import React from "react";
import {ScrollView, TouchableOpacity, StyleSheet, Image} from "react-native";
import {elementsMenuStyles} from "../styles";
import {ElementType} from "../../../model/enum";
import PropTypes from "prop-types";

const EYEBROW_1 = require("../icons/eyebrow/eyebrow_1.png");
const EYEBROW_2 = require("../icons/eyebrow/eyebrow_2.png");
const EYEBROW_3 = require("../icons/eyebrow/eyebrow_3.png");
const EYEBROW_4 = require("../icons/eyebrow/eyebrow_4.png");
const EYEBROW_5 = require("../icons/eyebrow/eyebrow_5.png");
const EYEBROW_6 = require("../icons/eyebrow/eyebrow_6.png");
const EYEBROW_7 = require("../icons/eyebrow/eyebrow_7.png");
const EYEBROW_8 = require("../icons/eyebrow/eyebrow_8.png");

const EYEBROW_SETTINGS = [
  {icon: <Image source={EYEBROW_1} />, name: "eyebrow_1"},
  {icon: <Image source={EYEBROW_2} />, name: "eyebrow_2"},
  {icon: <Image source={EYEBROW_3} />, name: "eyebrow_3"},
  {icon: <Image source={EYEBROW_4} />, name: "eyebrow_4"},
  {icon: <Image source={EYEBROW_5} />, name: "eyebrow_5"},
  {icon: <Image source={EYEBROW_6} />, name: "eyebrow_6"},
  {icon: <Image source={EYEBROW_7} />, name: "eyebrow_7"},
  {icon: <Image source={EYEBROW_8} />, name: "eyebrow_8"},
];

export const ConstructorEyebrow = ({ changeElement }) => {
  return (
    <ScrollView contentContainerStyle={elementsMenuStyles.container}>
      {EYEBROW_SETTINGS.map((item, index) => (
        <TouchableOpacity key={index} style={elementsMenuStyles.button} onPress={() => changeElement(ElementType.HAIR, index + 1)}>
          {item.icon}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

ConstructorEyebrow.propTypes = {
  changeElement: PropTypes.func.isRequired,
};