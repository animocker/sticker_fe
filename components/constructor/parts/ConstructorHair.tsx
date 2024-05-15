import React from "react";
import {ScrollView, TouchableOpacity, StyleSheet, Image} from "react-native";
import {elementsMenuStyles} from "../styles";
import PropTypes from "prop-types";
import {styleAssets} from "../../../styleAssets";
import {ElementType} from "../../../backend/db/enum";

const HAIR_1 = require("../icons/hair/hair_1.png");
const HAIR_2 = require("../icons/hair/hair_2.png");
const HAIR_3 = require("../icons/hair/hair_3.png");
const HAIR_4_0 = require("../icons/hair/hair_4.png");
const HAIR_4_1 = require("../icons/hair/hair_4_fringe_1.png");
const HAIR_4_2 = require("../icons/hair/hair_4_fringe_2.png");
const HAIR_5 = require("../icons/hair/hair_5.png");
const HAIR_6 = require("../icons/hair/hair_6.png");
const HAIR_7 = require("../icons/hair/hair_7.png");
const HAIR_8 = require("../icons/hair/hair_8.png");
const HAIR_9 = require("../icons/hair/hair_9.png");
const HAIR_10 = require("../icons/hair/hair_10.png");
const HAIR_11 = require("../icons/hair/hair_11.png");

const HAIR_SETTINGS = [
  {icon: <Image source={HAIR_1} />, name: "hair_1"},
  {icon: <Image source={HAIR_2} />, name: "hair_2"},
  {icon: <Image source={HAIR_3} />, name: "hair_3"},
  {icon: <Image source={HAIR_4_0} />, name: "hair_4_0"},
  {icon: <Image source={HAIR_4_1} />, name: "hair_4_1"},
  {icon: <Image source={HAIR_4_2} />, name: "hair_4_2"},
  {icon: <Image source={HAIR_5} />, name: "hair_5"},
  {icon: <Image source={HAIR_6} />, name: "hair_6"},
  {icon: <Image source={HAIR_7} />, name: "hair_7"},
  {icon: <Image source={HAIR_8} />, name: "hair_8"},
  {icon: <Image source={HAIR_9} />, name: "hair_9"},
  {icon: <Image source={HAIR_10} />, name: "hair_10"},
  {icon: <Image source={HAIR_11} />, name: "hair_11"},
];

export const ConstructorHair = ({ changeElement }) => {
  return (
      <ScrollView contentContainerStyle={elementsMenuStyles.container}>
        {HAIR_SETTINGS.map((item, index) => (
            <TouchableOpacity key={index} style={elementsMenuStyles.button} onPress={() => changeElement(ElementType.HAIR, index + 1)}>
              {item.icon}
            </TouchableOpacity>
        ))}
      </ScrollView>
  );
};

ConstructorHair.propTypes = {
  changeElement: PropTypes.func.isRequired,
};
