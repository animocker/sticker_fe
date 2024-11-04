import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SETTINGS_APPEARANCE } from "./types";
import { SvgXml } from "react-native-svg";
import { ICONS_APPEARANCE } from "./icons/icons_element_menu";
import { ConstructorHead } from "./elements-parts/ConstructorHead";
import { ConstructorHair } from "./elements-parts/ConstructorHair";
import { ConstructorEyebrow } from "./elements-parts/ConstructorEyebrow";
import { ConstructorEye } from "./elements-parts/ConstructorEye";
import { ConstructorNose } from "./elements-parts/ConstructorNose";
import { ConstructorLips } from "./elements-parts/ConstructorLips";
import PropTypes from "prop-types";
import { styleAssets } from "../../styleAssets";
import ConfigService from "../../backend/ConfigService";
import { ElementTypeConfig } from "../../model/Config";
import { ElementType } from "../../model/enum";

export const ConstructorAppearanceMenu = ({ selectedValues, changeElement, changeSize, changeColor }) => {
  const buttonTitles = Object.values(SETTINGS_APPEARANCE);
  const [selectedTab, setSelectedTab] = useState(Object.values(SETTINGS_APPEARANCE)[0]);
  const [settings, setSettings] = useState({} as Record<ElementType, ElementTypeConfig>);

  useEffect(() => {
    ConfigService.getElementTypeConfigs().then((config) => {
      const result = config.reduce(
        (acc, item) => {
          acc[item.elementType] = item;

          return acc;
        },
        {} as Record<ElementType, ElementTypeConfig>,
      );
      setSettings(result);
    });
  }, []);

  const tabs = {
    [ElementType.HEAD]: (props) => (
      <ConstructorHead
        {...props}
        changeElement={changeElement}
        changeSize={changeSize}
        changeColor={changeColor}
        settings={settings[ElementType.HEAD]}
        selectedValue={selectedValues[ElementType.HEAD]}
      />
    ),
    [ElementType.HAIR]: (props) => <ConstructorHair {...props} changeElement={changeElement} />,
    [ElementType.EYEBROWS]: (props) => <ConstructorEyebrow {...props} changeElement={changeElement} />,
    [ElementType.EYES]: (props) => <ConstructorEye {...props} changeElement={changeElement} />,
    [ElementType.NOSE]: (props) => <ConstructorNose {...props} changeElement={changeElement} />,
    [ElementType.MOUTH]: (props) => <ConstructorLips {...props} changeElement={changeElement} />,
  };

  return (
    <View style={styles.container}>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {buttonTitles.map((title, index) => (
            <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={[styles.button, selectedTab === title && styles.selectedButton]} onPress={() => setSelectedTab(title)}>
                {<SvgXml xml={ICONS_APPEARANCE[title]} />}
                <Text>{title}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {tabs[selectedTab] ? React.createElement(tabs[selectedTab]) : null}
      </View>
    </View>
  );
};

ConstructorAppearanceMenu.propTypes = {
  selectedValues: PropTypes.object.isRequired,
  changeElement: PropTypes.func.isRequired,
  changeSize: PropTypes.func.isRequired,
  changeColor: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: styleAssets.colorsPalette.white,
    borderColor: styleAssets.colorsPalette.white,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: "row",
    gap: 8,
    margin: 5,
    paddingBottom: 5,
    paddingTop: 5,
    padding: 10,
  },
  container: {
    backgroundColor: styleAssets.colorsPalette.mediumBlue,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: "100%",
    padding: 16,
  },
  selectedButton: {
    borderColor: styleAssets.colorsPalette.primeBlue,
  },
});
