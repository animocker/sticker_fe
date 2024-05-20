import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { RangeSlider } from "../../ui/RangeSlider";
import { elementsMenuStyles } from "../styles";
import { Color } from "../../../model/Config";

export const CommonConstructorParts = ({
  settings,
  changeSizeHandle,
  changeColorHandle,
}) => {
  return (
    <View>
      {settings.isSizeChangeable && (
        <View>
          <RangeSlider initialSize={0} changeSize={changeSizeHandle} />
        </View>
      )}
      <View style={elementsMenuStyles.colorContainerWrapper}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={elementsMenuStyles.colorContainer}
        >
          {settings.colorSettings.map((color: Color) => (
            <TouchableOpacity
              key={color.id}
              style={[
                elementsMenuStyles.colorButton,
                { backgroundColor: `#${color.hex}` },
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
  changeSizeHandle: PropTypes.func.isRequired,
  changeColorHandle: PropTypes.func.isRequired,
};
