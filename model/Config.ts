import {ElementType} from "./enum";

export type ElementTypeConfig= {
    elementType: ElementType;
    isSizeChangeable: boolean;
    //if single color config is provided, it means that the colors is for all elements of the given type, otherwise it is for a specific element
    colorSets: ColorSet[];
}

/**
 * If elementNumber is not provided, it means that the colors is for all elements of the given type
 */
export type ColorSet = {
    id: string;
    elementType: ElementType,
    elementNumber?: number,
    colors: Color[],
}

export type Color = {
    id: string;
    name: string;
    hex: string;
}
