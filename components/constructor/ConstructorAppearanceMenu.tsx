import React from "react";
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity} from "react-native";
import { SETTINGS_APPEARANCE } from "./types";
import {SvgUri} from "react-native-svg";
import { SvgXml } from "react-native-svg";
import {ICONS_APPERANCE} from "./icons";
export const ConstructorAppearanceMenu = () => {
  const buttonTitles = Object.values(SETTINGS_APPEARANCE);

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {buttonTitles.map((title, index) => (
          <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={styles.button} onPress={() => console.log("Button pressed")}>
              <SvgXml xml={ICONS_APPERANCE[title]} />
              <Text>{title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: "blue",
    borderWidth: 1,
    flexDirection: "row",
    margin: 10,
  },
});