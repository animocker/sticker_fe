import React from "react";
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from "react-native";
import {RangeSlider} from "../../ui/RangeSlider";
import PropTypes from "prop-types";
import {ElementType} from "../../../backend/db/enum";
export const ConstructorHead = ({changeSize}) => {

  const changeSizeHandle = (size) => {
    changeSize(ElementType.HEAD, size);
  };

  return (
    <View>
      <View>
        <Text>
          Head tab
        </Text>
      </View>
      <RangeSlider initialSize={0} changeSize={changeSizeHandle}  />
    </View>
  );
};

ConstructorHead.propTypes = {
  changeSize: PropTypes.func.isRequired,
};
