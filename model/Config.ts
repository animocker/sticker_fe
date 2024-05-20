import { ElementType } from "./enum";

export type ElementTypeConfig = {
  elementType: ElementType;
  isSizeChangeable: boolean;
  colorSets: ColorSet[];
};

/**
 * If elementNumber is not provided, it means that the colors is for all elements of the given type
 */
export type ColorSet = {
  id: string;
  elementType: ElementType;
  elementNumber?: number;
  colors: Color[];
};

export type Color = {
  id: string;
  name: string;
  hex: string;
};
