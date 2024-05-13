import {StyleSheet} from "react-native";
import {styleAssets} from "../../styleAssets";

export const elementsMenuStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor:styleAssets.colorsPalette.white,
    borderRadius: 16,
    height: 96,
    justifyContent: "center",
    margin: 10,
    padding: 10,
    width: 96
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 50
  },
});