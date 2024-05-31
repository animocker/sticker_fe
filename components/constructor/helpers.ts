import { ElementTypeConfig } from "../../model/Config";

export const filterSettings = (settings: ElementTypeConfig, selectedElementValue: number) => {
  const colorSettings = settings?.colorSets
    .filter((item) => {
      return !item.elementNumber || item.elementNumber === selectedElementValue;
    })
    .map((item) => {
      return {
        id: item.id,
        hex: item.colors[0].hex,
      };
    });

  return {
    isSizeChangeable: settings.isSizeChangeable,
    colorSettings,
  };
};
