import {ElementType} from "./enum";

export type ElementTypeConfig= {
    elementType: ElementType;
    isSizeChangeable: boolean;
    isColorChangeable: boolean;
    //if single color config is provided, it means that the colors is for all elements of the given type, otherwise it is for a specific element
    colorConfigs: ColorConfig[];
}

/**
 * If elementNumber is not provided, it means that the colors is for all elements of the given type
 */
export type ColorConfig = {
    elementType: ElementType,
    elementNumber?: number,
    colors: Color[],
}

export type Color = {
    id: string;
    isBasic: boolean;
    mainColor: string;
    strokeColor: string;
    additionalColors: string[];
}
