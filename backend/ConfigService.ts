
import {findColors, getAllColors} from "./db/AvatarWatermelonDao";
import _ from "lodash";
import {Color, ColorConfig, ElementTypeConfig} from "../model/Config";
import {allElements, ElementType} from "../model/enum";
import {ColorWDB} from "./watermelon-db/model";

class ConfigService {
  private elementTypeConfigs : ElementTypeConfig[] = null;
  private readonly colorById: Map<string, Color> = new Map<string, Color>();

  public async getElementTypeConfigs():Promise<ElementTypeConfig[]> {
    if (this.elementTypeConfigs === null) {
      this.elementTypeConfigs = await this.buildElementTypeConfig();
    }
    return this.elementTypeConfigs;
  }

  public async getElementTypeConfig(elementType: ElementType | string): Promise<ElementTypeConfig> {
    const configs = await this.getElementTypeConfigs();
    return configs.find(it => it.elementType === elementType);
  }

  public getColorById(id: string): Color {
    return this.colorById.get(id);
  }

  private async buildElementTypeConfig(): Promise<ElementTypeConfig[]> {
    const allColors = await getAllColors();
    const elementTypeToColors =  _.groupBy(allColors, "elementType");
    return  allElements.map((elementType) => {
      const colors = elementTypeToColors[elementType] || [];
      const colorsConfig = this.buildColorConfig(elementType, colors);
      return {
        elementType: elementType,
        isSizeChangeable: true,
        isColorChangeable: colorsConfig.length > 0,
        colorConfigs: colorsConfig
      };
    });
  }

  private buildColorConfig(elementType: ElementType, colors: ColorWDB[]): ColorConfig[] {
    if (colors.length === 0) {
      return [];
    }
    const colorsWithElementNumber =  _.filter(colors, (it: ColorWDB) => it.elementNbr !== null);
    if (colorsWithElementNumber.length === 0) {
      return [{
        elementType: elementType,
        colors: colors.map(it => this.mapColor(it))
      }];
    }
    //TODO in progress
    const groupedByElementNumber = _(colorsWithElementNumber)
      .groupBy((it: ColorWDB) => it.elementNbr);
    return [];
  }

  private mapColor(source: ColorWDB): Color {
    if (this.colorById.has(source.id)) {
      return this.colorById.get(source.id);
    }
    const result = {
      id: source.id,
      isBasic: source.isBasic,
      mainColor: source.mainColor,
      strokeColor: source.strokeColor,
      additionalColors: source.additionalColors.split(",")
    };
    this.colorById.set(source.id, result);
    return result;
  }
}

export default new ConfigService();
