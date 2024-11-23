import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { RangeSlider } from "../../ui/RangeSlider";
import { elementsMenuStyles } from "../styles";
import { ElementType } from "../../../model/enum";
import { ChangeColorCommand, ChangeElementCommand, ChangeSizeCommand } from "../../../model/ChangeStateCommand";
import AvatarService from "../../../backend/avatar/AvatarService";
import colorService, { ColorSet } from "../../../backend/ColorService";
import { CommonConstructorParts } from "./CommonConstructorParts";
import { filterSettings } from "../helpers";
import ColorService from "../../../backend/ColorService";

export function ConstructorElements(settings, elementType: ElementType) {
  const [elementNumber, setElementNumber] = useState(1);
  const [size, setSize] = useState(0);
  const [currentColor, setCurrentColor] = useState<ColorSet>();
  const [colors, setColors] = useState<ColorSet[]>([]);

  ColorService.getColorsForElement(elementType, elementNumber).then((colors) => {
    setColors(colors);
  });

  const changeElement = (number) => {
    setElementNumber(number);
    const request = new ChangeElementCommand(elementType, number);
    AvatarService.executeCommand(request);
    ColorService.getColorsForElement(elementType, elementNumber).then((colors) => {
      setColors(colors);
    });
  };

  const changeSize = (sizePercent: number) => {
    setSize(sizePercent);
    AvatarService.executeCommand(new ChangeSizeCommand(elementType, sizePercent));
  };

  const changeColor = (color: ColorSet) => {
    setCurrentColor(color);
    AvatarService.executeCommand(new ChangeColorCommand(elementType, elementNumber, color.id));
  };

  return (
    <View>
      <View>
        <View>
          <RangeSlider initialSize={size} changeSize={changeSize} />
        </View>
        <View style={elementsMenuStyles.colorContainerWrapper}>
          <ScrollView horizontal={true} contentContainerStyle={elementsMenuStyles.colorContainer}>
            {colors.map((color: ColorSet) => (
              <TouchableOpacity
                key={color.id}
                style={[elementsMenuStyles.colorButton, { backgroundColor: `#${color.colors[0].hex}` }]}
                onPress={() => {
                  changeColor(color);
                }}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <ScrollView contentContainerStyle={elementsMenuStyles.container}>
        {HEAD_SETTINGS.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[elementsMenuStyles.button, elementNumber === index && elementsMenuStyles.buttonSelected]}
            onPress={() => changeElement(index)}
          >
            {item.icon}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

{
  /*<ColorListPicker colors={colorsList} changeColor={changeColorHandle} />*/
}
