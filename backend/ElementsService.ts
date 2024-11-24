import { ElementType } from "../model/enum";
import { getColorSetById, getColorSetsByElementId } from "./db/ColorWatermelonDao";
import { ColorSetWDB, ColorWDB } from "./watermelon-db/read-only/model";
import { Image } from "react-native";
import { getElements } from "./db/ElementsDao";

export type Element = {
  number: number;
  iconSource: any;
};

export type ColorSet = {
  id: string;
  colors: Color[];
};

export type Color = {
  name: string;
  hex: string;
};

class ElementsService {
  public async getElements(elementType: ElementType): Promise<Element[]> {
    const elements = await getElements(elementType);
    return elements.map((element) => {
      try {
        const icon = require.resolve(`../components/constructor/icons/${elementType.toLowerCase()}/${element.number}.png`);
        return { iconSource: icon, number: element.number };
      } catch (error) {
        //TODO fix it
        return { iconSource: require.resolve("../components/constructor/icons/head/1.png"), number: element.number };
      }
    });
  }

  public async getColorsForElement(elementType: string | ElementType, elementNumber: number): Promise<ColorSet[]> {
    return getColorSetsByElementId(`${elementType}_${elementNumber}`)
      .then((colorSets) => colorSets.map((colorSet) => this.mapColorSet(colorSet)))
      .then((colorPromise) => Promise.all(colorPromise));
  }

  public async getColorSetById(id: string): Promise<ColorSet> {
    return getColorSetById(id).then((colorSet) => this.mapColorSet(colorSet));
  }

  private async mapColorSet(source: ColorSetWDB): Promise<ColorSet> {
    const colorsWDB = await source.colors.fetch();
    const colors = colorsWDB.map((color) => this.mapColor(color));
    return { id: source.id, colors: colors };
  }

  private mapColor(source: ColorWDB): Color {
    return { name: source.name, hex: source.hex };
  }
}

export default new ElementsService();
