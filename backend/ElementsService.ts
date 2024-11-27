import { ElementType } from "../model/enum";
import { getColorSetById, getColorSetsByElementId } from "./db/ColorWatermelonDao";
import { ColorSetWDB, ColorWDB } from "./watermelon-db/read-only/model";
import { getElements } from "./db/ElementsDao";
import head from "../codegen/icons/components/head";
import eyes from "../codegen/icons/components/eyes";
import mouth from "../codegen/icons/components/mouth";
import nose from "../codegen/icons/components/nose";
import hair from "../codegen/icons/components/hair";
import beard from "../codegen/icons/components/beard";
import brows from "../codegen/icons/components/brows";
import glasses from "../codegen/icons/components/glasses";
import cloth from "../codegen/icons/components/cloth";
import hat from "../codegen/icons/components/hat";
import Unknown from "../codegen/icons/components/Unknown";
import { FC } from "react";

export type Element = {
  number: number;
  icon: FC;
};

export type ColorSet = {
  id: string;
  colors: Color[];
};

export type Color = {
  name: string;
  hex: string;
};

const ElementTypesToIcons = new Map<ElementType, unknown>();
{
  ElementTypesToIcons.set(ElementType.BEARD, beard);
  ElementTypesToIcons.set(ElementType.CLOTHES, cloth);
  ElementTypesToIcons.set(ElementType.EYEBROWS, brows);
  ElementTypesToIcons.set(ElementType.EYES, eyes);
  ElementTypesToIcons.set(ElementType.GLASSES, glasses);
  ElementTypesToIcons.set(ElementType.HAIR, hair);
  ElementTypesToIcons.set(ElementType.HAT, hat);
  ElementTypesToIcons.set(ElementType.HEAD, head);
  ElementTypesToIcons.set(ElementType.MOUTH, mouth);
  ElementTypesToIcons.set(ElementType.NOSE, nose);
}

class ElementsService {
  private elements = new Map<ElementType, Element[]>();

  public async getElements(elementType: ElementType): Promise<Element[]> {
    const elements = await getElements(elementType);
    return elements.map((element) => {
      if (!ElementTypesToIcons.has(elementType)) {
        return { icon: Unknown, number: element.number };
      }
      const icon = ElementTypesToIcons.get(elementType)[element.number];
      if (!icon) {
        return { icon: Unknown, number: element.number };
      }
      return { icon: icon, number: element.number };
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
