import React, {useState} from "react";
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity} from "react-native";
import { SETTINGS_APPEARANCE } from "./types";
import { SvgXml } from "react-native-svg";
import {ICONS_APPERANCE} from "./icons/icons_element_menu";
import {ConstructorHead} from "./parts/ConstructorHead";
import {ConstructorHair} from "./parts/ConstructorHair";
import PropTypes from "prop-types";
import {styleAssets} from "../../styleAssets";
export const ConstructorAppearanceMenu = ({changeElement, changeSize, changeColor}) => {
  const buttonTitles = Object.values(SETTINGS_APPEARANCE);
  const [selectedTab, setSelectedTab] = useState(Object.values(SETTINGS_APPEARANCE)[0]);

  const tabs = {
    [SETTINGS_APPEARANCE.HEAD]: (props) => <ConstructorHead {...props} changeElement={changeElement} changeSize={changeSize} changeColor={changeColor} />,
    [SETTINGS_APPEARANCE.HAIR]: (props) => <ConstructorHair {...props} changeElement={changeElement} />,
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
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: styleAssets.colorsPalette.white,
    borderColor: styleAssets.colorsPalette.white,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: "row",
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
