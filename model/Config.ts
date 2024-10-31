import { ElementType } from "./enum";

export type ElementTypeConfig = {
  elementType: ElementType;
  isSizeChangeable: boolean;
  colorSets: ColorSet[];
};

export type ColorSet = {
  id: string;
  elementType: ElementType;
  elementNumber: number;
  colors: Color[];
};

export type Color = {
  id: string;
  name: string;
  hex: string;
};
