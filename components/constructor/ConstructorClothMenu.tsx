import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import { SETTINGS_CLOTH } from "./types";
import { ICONS_CLOTH } from "./icons/icons_element_menu";

export const ConstructorClothMenu = () => {
  const buttonTitles = Object.values(SETTINGS_CLOTH);

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {buttonTitles.map((title, index) => (
          <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={styles.button} onPress={() => console.log("Button pressed")}>
              <SvgXml xml={ICONS_CLOTH[title]} />
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
