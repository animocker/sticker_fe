import React, {useState} from "react";
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity} from "react-native";
import { SETTINGS_APPEARANCE } from "./types";
import {SvgUri} from "react-native-svg";
import { SvgXml } from "react-native-svg";
import {ICONS_APPERANCE} from "./icons/icons_element_menu";
import AvatarService from "../../service/AvatarService";
import {ConstructorHead} from "./parts/ConstructorHead";
import {ConstructorHair} from "./parts/ConstructorHair";
import PropTypes from "prop-types";
export const ConstructorAppearanceMenu = ({changeElement}) => {
  const buttonTitles = Object.values(SETTINGS_APPEARANCE);
  const [selectedTab, setSelectedTab] = useState(Object.values(SETTINGS_APPEARANCE)[0]);



  const tabs = {
    [SETTINGS_APPEARANCE.HEAD]: ConstructorHead,
    [SETTINGS_APPEARANCE.HAIR]: (props) => <ConstructorHair {...props} changeElement={changeElement} />,
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {buttonTitles.map((title, index) => (
          <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={styles.button} onPress={() => setSelectedTab(title)}>
              <SvgXml xml={ICONS_APPERANCE[title]} />
              <Text>{title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {tabs[selectedTab] ? React.createElement(tabs[selectedTab]) : null}
    </View>
  );
};

ConstructorAppearanceMenu.propTypes = {
  changeElement: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    borderColor: "blue",
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    margin: 5,
    padding: 5
  },
});