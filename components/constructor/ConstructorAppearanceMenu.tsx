import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SETTINGS_APPEARANCE } from "./types";
import { SvgXml } from "react-native-svg";
import { ICONS_APPEARANCE } from "./icons/icons_element_menu";
import { ConstructorHair } from "./elements-parts/ConstructorHair";
import { ConstructorEyebrow } from "./elements-parts/ConstructorEyebrow";
import { ConstructorEye } from "./elements-parts/ConstructorEye";
import { ConstructorNose } from "./elements-parts/ConstructorNose";
import { ConstructorLips } from "./elements-parts/ConstructorLips";
import { styleAssets } from "../../styleAssets";
import { ElementType } from "../../model/enum";
import { ConstructorElements } from "./common-parts/ConstructorElements";

export const ConstructorAppearanceMenu = ({ selectedValues, changeElement, changeSize, changeColor }) => {
  const buttonTitles = Object.values(SETTINGS_APPEARANCE);
  const [selectedTab, setSelectedTab] = useState(Object.values(SETTINGS_APPEARANCE)[0]);

  const tabs = {
    [ElementType.HEAD]: (props) => <ConstructorElements elementType={ElementType.HEAD} />,
    [ElementType.HAIR]: (props) => <ConstructorElements elementType={ElementType.HAIR} />,
    [ElementType.EYEBROWS]: (props) => <ConstructorElements elementType={ElementType.EYEBROWS} />,
    [ElementType.EYES]: (props) => <ConstructorElements elementType={ElementType.EYES} />,
    [ElementType.NOSE]: (props) => <ConstructorElements elementType={ElementType.NOSE} />,
    [ElementType.MOUTH]: (props) => <ConstructorElements elementType={ElementType.MOUTH} />,
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
