import { getColorSetById, getColorSetsByElementId } from "./db/ColorLocalDao";
import { ElementType } from "../model/enum";

export type ColorSet = {
  id: string;
  colors: Color[];
};

export type Color = {
  name: string;
  hex: string;
};

class ColorService {
  //TODO check performance
  public async getColorsForElement(elementType: string | ElementType, elementNumber: number): Promise<ColorSet[]> {
    return getColorSetsByElementId(`${elementType}_${elementNumber}`)
      .then((colorSets) => colorSets.map((colorSet) => this.mapColorSet(colorSet)))
      .then((colorPromise) => Promise.all(colorPromise));
  }

  public async getColorSetById(id: string): Promise<ColorSet> {
    return getColorSetById(id).then((colorSet) => this.mapColorSet(colorSet));
  }

  private async mapColorSet(source: any): Promise<ColorSet> {
    const colorsWDB = await source.colors.fetch();
    const colors = colorsWDB.map((color) => this.mapColor(color));
    return { id: source.id, colors: colors };
  }

  private mapColor(source: any): Color {
    return { name: source.name, hex: source.hex };
  }
}

export default new ColorService();
