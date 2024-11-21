import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { elementsMenuStyles } from "../styles";
import { Color } from "../../../model/Config";

export const CommonConstructorParts = ({ settings, changeSizeHandle, changeColorHandle, selectedValue }) => {
  return (
    <View>
      {settings.isSizeChangeable && <View>{/*    <RangeSlider initialSize={selectedValue?.size || 0} changeSize={changeSizeHandle} />*/}</View>}
      <View style={elementsMenuStyles.colorContainerWrapper}>
        <ScrollView horizontal={true} contentContainerStyle={elementsMenuStyles.colorContainer}>
          {settings.colorSettings.map((color: Color) => (
            <TouchableOpacity
              key={color.id}
              style={[
                elementsMenuStyles.colorButton,
                { backgroundColor: `#${color.hex}` },
                color.id == selectedValue?.colorSet.id ? elementsMenuStyles.colorButtonSelected : null,
              ]}
              onPress={() => {
                changeColorHandle(color);
              }}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

{
  /*<ColorListPicker colors={colorsList} changeColor={changeColorHandle} />*/
}

CommonConstructorParts.propTypes = {
  settings: PropTypes.object.isRequired,
  selectedValue: PropTypes.object,
  changeSizeHandle: PropTypes.func.isRequired,
  changeColorHandle: PropTypes.func.isRequired,
};
