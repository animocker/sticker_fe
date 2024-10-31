import { getAllColorSets } from "./db/AvatarWatermelonDao";
import _ from "lodash";
import { Color, ColorSet, ElementTypeConfig } from "../model/Config";
import { allElementsTypes, ElementType } from "../model/enum";
import { ColorSetWDB, ColorWDB } from "./watermelon-db/read-only/model";

class ConfigService {
  private elementTypeConfigs: ElementTypeConfig[] = null;
  private readonly colorById: Map<string, Color> = new Map<string, Color>();
  private readonly colorSetById: Map<string, ColorSet> = new Map<string, ColorSet>();

  customize() {
    this.elementTypeConfigs
      .find((it) => it.elementType === ElementType.HEAD)
      .colorSets.forEach((item) => {
        item.colors
          .filter((it) => it.name.includes("stroke"))
          .forEach((it) => {
            it.hex = "000000";
          });
      });
  }

  public async getElementTypeConfigs(): Promise<ElementTypeConfig[]> {
    if (this.elementTypeConfigs === null) {
      this.elementTypeConfigs = await this.buildElementTypeConfig();
    }
    this.customize();
    console.log(this.elementTypeConfigs);
    return this.elementTypeConfigs;
  }

  public async getElementTypeConfig(elementType: ElementType | string): Promise<ElementTypeConfig> {
    const configs = await this.getElementTypeConfigs();
    return configs.find((it) => it.elementType === elementType);
  }

  public getColorSetById(id: string): ColorSet {
    return this.colorSetById.get(id);
  }

  public getColorById(id: string): Color {
    return this.colorById.get(id);
  }

  private async buildElementTypeConfig(): Promise<ElementTypeConfig[]> {
    const allElementsWithColors =
    const allColorSets = await getAllColorSets();
    const elementTypeToColors = _.groupBy(allColorSets, "elementType");
    const resultPromises = allElementsTypes.map(async (elementType) => {
      const colorSetsWdb = elementTypeToColors[elementType] || [];
      const colorSets = await this.buildColorSet(colorSetsWdb);
      return {
        elementType: elementType,
        isSizeChangeable: true,
        colorSets: colorSets,
      };
    });
    return await Promise.all(resultPromises);
  }

  private async buildColorSet(colorSets: ColorSetWDB[]): Promise<ColorSet[]> {
    if (colorSets.length === 0) {
      return [];
    }
    return await Promise.all(colorSets.map(async (it) => await this.mapColorSet(it)));
  }

  private async mapColorSet(source: ColorSetWDB): Promise<ColorSet> {
    if (this.colorSetById.has(source.id)) {
      return this.colorSetById.get(source.id);
    }
    const elements = await source.elements.fetch();
    const elementType = elements[0].type;
    let elementNumber = null;
    if (elements.length == 1) {
      //if more than one element, it means that the colors is for all elements of the given type
      elementNumber = elements[0].number;
    }
    const result = {
      id: source.id,
      elementType: elementType as ElementType,
      elementNumber: elementNumber,
      colors: (await source.colors.fetch()).map((it) => this.mapColor(it)),
    };
    this.colorSetById.set(source.id, result);
    return result;
  }

  private mapColor(source: ColorWDB): Color {
    if (this.colorById.has(source.id)) {
      return this.colorById.get(source.id);
    }
    const result = {
      id: source.id,
      name: source.name,
      hex: source.hex,
    };
    this.colorById.set(source.id, result);
    return result;
  }
}

export default new ConfigService();
