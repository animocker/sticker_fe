import {ElementType} from "./enum";

export type Config= {
isSizeChangeable: boolean;
isColorChangeable: boolean;
colorConfigs: ColorConfig[];
}
//TODO Wip
export type ColorConfig = {
    elementType: ElementType,
    colors: string[],
    mainColor: string,
    colorEntityId: string
}
