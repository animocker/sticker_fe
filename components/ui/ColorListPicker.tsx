import React from "react";
import { TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { styleAssets } from "../../styleAssets";

export const ColorListPicker = ({ colors, changeColor }) => {
  return (
    <ScrollView style={styles.container} horizontal>
      {colors.map((color, index) => (
        <TouchableOpacity key={index} style={[styles.colorButton, { backgroundColor: color }]} onPress={() => changeColor(color)} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  colorButton: {
    borderRadius: 24,
    height: 48,
    margin: 8,
    width: 48,
  },
  container: {
    backgroundColor: styleAssets.colorsPalette.lowBlue,
    borderRadius: styleAssets.border.main,
    flexDirection: "row",
    padding: 8,
  },
});
