import React from "react";
import {ScrollView, TouchableOpacity, StyleSheet} from "react-native";

import HAIR_1 from "../icons/hair/hair_1.svg";
import HAIR_2 from "../icons/hair/hair_2.svg";
import HAIR_3 from "../icons/hair/hair_3.svg";
import HAIR_4 from "../icons/hair/hair_4.svg";
import HAIR_5 from "../icons/hair/hair_5.svg";
import HAIR_6 from "../icons/hair/hair_6.svg";
import HAIR_7 from "../icons/hair/hair_7.svg";
import HAIR_8 from "../icons/hair/hair_8.svg";
import HAIR_9 from "../icons/hair/hair_9.svg";
import HAIR_10 from "../icons/hair/hair_10.svg";
import HAIR_11 from "../icons/hair/hair_11.svg";
import {ElementType} from "../../../backend/db/enum";
import PropTypes from "prop-types";

const HAIR_SETTINGS = [
  {icon: <HAIR_1 />, name: "hair_1"},
  {icon: <HAIR_2 />, name: "hair_2"},
  {icon: <HAIR_3 />, name: "hair_3"},
  {icon: <HAIR_4 />, name: "hair_4"},
  {icon: <HAIR_5 />, name: "hair_5"},
  {icon: <HAIR_6 />, name: "hair_6"},
  {icon: <HAIR_7 />, name: "hair_7"},
  {icon: <HAIR_8 />, name: "hair_8"},
  {icon: <HAIR_9 />, name: "hair_9"},
  {icon: <HAIR_10 />, name: "hair_10"},
  {icon: <HAIR_11 />, name: "hair_11"},
];

export const ConstructorHair = ({ changeElement }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {HAIR_SETTINGS.map((item, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={() => changeElement(ElementType.HAIR, index + 1)}>
          {item.icon}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

ConstructorHair.propTypes = {
  changeElement: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    height: 100,
    justifyContent: "center",
    margin: 10,
    padding: 10,
    width: 100
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 50
  },
});
