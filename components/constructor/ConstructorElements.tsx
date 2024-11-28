import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { elementsMenuStyles } from "./styles";
import { ChangeColorCommand, ChangeElementCommand, ChangeSizeCommand } from "../../model/ChangeStateCommand";
import AvatarService from "../../backend/avatar/AvatarService";
import ElementsService, { ColorSet, Element } from "../../backend/ElementsService";
import { ElementType } from "../../model/enum";

interface Props {
  elementType: ElementType;
}

export const ConstructorElements = (props: Props) => {
  const [elementNumber, setElementNumber] = useState(1);
  const [size, setSize] = useState(0);
  const [currentColor, setCurrentColor] = useState<ColorSet>();
  const [colors, setColors] = useState<ColorSet[]>(ElementsService.getColorsForElement(props.elementType, elementNumber));
  const elements = ElementsService.getElements(props.elementType);

  const changeElement = (number: number) => {
    setElementNumber(number);
    const request = new ChangeElementCommand(props.elementType, number);
    AvatarService.executeCommand(request);
    setColors(ElementsService.getColorsForElement(props.elementType, number));
  };

  const changeSize = (sizePercent: number) => {
    setSize(sizePercent);
    AvatarService.executeCommand(new ChangeSizeCommand(props.elementType, sizePercent));
  };

  const changeColor = (color: ColorSet) => {
    setCurrentColor(color);
    AvatarService.executeCommand(new ChangeColorCommand(props.elementType, elementNumber, color.id));
  };

  return (
    <View>
      <View>
        <View>
          <Text>size</Text>
          {/*     <RangeSlider initialSize={size} changeSize={changeSize} />*/}
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
        {elements.map((Element) => (
          <TouchableOpacity
            key={Element.number}
            style={[elementsMenuStyles.button, elementNumber === Element.number && elementsMenuStyles.buttonSelected]}
            onPress={() => changeElement(Element.number)}
          >
            <Element.icon></Element.icon>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
