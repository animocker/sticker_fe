import React, {useState} from "react";
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity} from "react-native";
import { SETTINGS_APPEARANCE } from "./types";
import { SvgXml } from "react-native-svg";
import {ICONS_APPERANCE} from "./icons/icons_element_menu";
import {ConstructorHead} from "./parts/ConstructorHead";
import {ConstructorHair} from "./parts/ConstructorHair";
import {ConstructorEyebrow} from "./parts/ConstructorEyebrow";
import {ConstructorEye} from "./parts/ConstructorEye";
import {ConstructorNose} from "./parts/ConstructorNose";
import {ConstructorLips} from "./parts/ConstructorLips";
import PropTypes from "prop-types";
import {styleAssets} from "../../styleAssets";
export const ConstructorAppearanceMenu = ({changeElement, changeSize, changeColor}) => {
  const buttonTitles = Object.values(SETTINGS_APPEARANCE);
  const [selectedTab, setSelectedTab] = useState(Object.values(SETTINGS_APPEARANCE)[0]);

  const tabs = {
    [SETTINGS_APPEARANCE.HEAD]: (props) => <ConstructorHead {...props} changeElement={changeElement} changeSize={changeSize} changeColor={changeColor} />,
    [SETTINGS_APPEARANCE.HAIR]: (props) => <ConstructorHair {...props} changeElement={changeElement} />,
    [SETTINGS_APPEARANCE.EYEBROW]: (props) => <ConstructorEyebrow {...props} changeElement={changeElement} />,
    [SETTINGS_APPEARANCE.EYE]: (props) => <ConstructorEye {...props} changeElement={changeElement} />,
    [SETTINGS_APPEARANCE.NOSE]: (props) => <ConstructorNose {...props} changeElement={changeElement} />,
    [SETTINGS_APPEARANCE.LIPS]: (props) => <ConstructorLips {...props} changeElement={changeElement} />,
  };

  return (
    <View style={styles.container}>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {buttonTitles.map((title, index) => (
            <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={[styles.button, selectedTab === title && styles.selectedButton]}
                onPress={() => setSelectedTab(title)}
              >
                <SvgXml xml={ICONS_APPERANCE[title]} />
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
    padding: 10
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
