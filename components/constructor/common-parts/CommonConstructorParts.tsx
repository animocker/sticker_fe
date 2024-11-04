import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { RangeSlider } from "../../ui/RangeSlider";
import { elementsMenuStyles } from "../styles";
import { Color } from "../../../model/Config";
import { ElementType } from "../../../model/enum";

export const CommonConstructorParts = ({ settings, elementType: ElementType }) => {
  const changeSizeHandle = (size: number) => {
    changeSize(ElementType.HEAD, size);
  };

  const changeColorHandle = (color: string) => {
    changeColor(ElementType.HEAD, color);
  };

  return (
    <View>
      {settings.isSizeChangeable && (
        <View>
          <RangeSlider initialSize={selectedValue?.size || 0} changeSize={changeSizeHandle} />
        </View>
      )}
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
