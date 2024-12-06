import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { elementsMenuStyles } from "./styles";
import { ChangeColorCommand, ChangeElementCommand, ChangeSizeCommand } from "../../model/ChangeStateCommand";
import AvatarService from "../../backend/avatar/AvatarService";
import ElementsService, { ColorSet, Element } from "../../backend/ElementsService";
import { ElementType } from "../../model/enum";
import common from "../../codegen/icons/components/common";
import { RangeSlider } from "../ui/RangeSlider";

interface Props {
  elementType: ElementType;
}

const NO_SIZE_ELEMENTS = [ElementType.CLOTHES, ElementType.HAIR];

export const ConstructorElements = (props: Props) => {
  const state = useMemo(() => AvatarService.getElementState(props.elementType), [props.elementType]);
  const elements = useMemo(() => ElementsService.getElements(props.elementType), [props.elementType]);
  const [elementNumber, setElementNumber] = useState(state.selectedIndex);
  const [size, setSize] = useState(state.size);
  const [currentColor, setCurrentColor] = useState<string>(state.colorSet);
  const [colors, setColors] = useState<ColorSet[]>(ElementsService.getColorsForElement(props.elementType, elementNumber));

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
    setCurrentColor(color.id);
    AvatarService.executeCommand(new ChangeColorCommand(props.elementType, elementNumber, color.id));
  };

  return (
    <View>
      <View>
        <View>
          {elementNumber > 0 && !NO_SIZE_ELEMENTS.includes(props.elementType) && <RangeSlider initialSize={size} changeSize={changeSize} />}
        </View>
        {colors.length > 0 && (
          <View style={elementsMenuStyles.colorContainerWrapper}>
            <ScrollView horizontal={true} contentContainerStyle={elementsMenuStyles.colorContainer}>
              {colors.map((color: ColorSet) => (
                <TouchableOpacity
                  key={color.id}
                  style={[
                    elementsMenuStyles.colorButton,
                    currentColor == color.id && elementsMenuStyles.colorButtonSelected,
                    { backgroundColor: `#${color.colors[0].hex}` },
                  ]}
                  onPress={() => {
                    changeColor(color);
                  }}
                />
              ))}
            </ScrollView>
          </View>
        )}
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
