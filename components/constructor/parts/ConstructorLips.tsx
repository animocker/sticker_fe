import React from "react";
import {ScrollView, TouchableOpacity, StyleSheet} from "react-native";
import {elementsMenuStyles} from "../styles";
import {ElementType} from "../../../backend/db/enum";
import PropTypes from "prop-types";

import LIPS_1 from "../icons/lips/lips_1.svg";
import LIPS_2 from "../icons/lips/lips_2.svg";
import LIPS_3 from "../icons/lips/lips_3.svg";
import LIPS_4 from "../icons/lips/lips_4.svg";
import LIPS_5 from "../icons/lips/lips_5.svg";

const LIPS_SETTINGS = [
  {icon: <LIPS_1 />, name: "lips_1"},
  {icon: <LIPS_2 />, name: "lips_2"},
  {icon: <LIPS_3 />, name: "lips_3"},
  {icon: <LIPS_4 />, name: "lips_4"},
  {icon: <LIPS_5 />, name: "lips_5"},
];

export const ConstructorLips = ({ changeElement }) => {
  return (
    <ScrollView contentContainerStyle={elementsMenuStyles.container}>
      {LIPS_SETTINGS.map((item, index) => (
        <TouchableOpacity key={index} style={elementsMenuStyles.button} onPress={() => changeElement(ElementType.LIPS, index + 1)}>
          {item.icon}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

ConstructorLips.propTypes = {
  changeElement: PropTypes.func.isRequired,
};