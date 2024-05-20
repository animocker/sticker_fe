import { StyleSheet } from "react-native";
import { styleAssets } from "../../styleAssets";

export const elementsMenuStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: styleAssets.colorsPalette.white,
    borderColor: styleAssets.colorsPalette.white,
    borderRadius: 16,
    borderWidth: 2,
    height: 96,
    justifyContent: "center",
    margin: 10,
    padding: 10,
    width: 96,
  },
  buttonSelected: {
    borderColor: styleAssets.colorsPalette.primeBlue,
  },
  colorButton: {
    borderColor: "transparent",
    borderRadius: 24,
    borderWidth: 2,
    height: 48,
    width: 48,
  },
  colorContainer: {
    display: "flex",
    gap: 10,
  },
  colorContainerWrapper: {
    backgroundColor: styleAssets.colorsPalette.lowBlue,
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 50,
  },
});
