import {allElements, AnimationType, ElementType} from "../model/enum";
import {ChangeColorCommand, ChangeElementCommand, ChangeSizeCommand} from "../model/Command";
import {findAnimation} from "./db/AvatarWatermelonDao";
import {Animation, ColorRgba} from "@lottiefiles/lottie-js";
import {Color} from "../model/Config";
import ConfigService from "./ConfigService";

class ElementTypeAndNumber {
  readonly elementType: ElementType | string;
  readonly elementNumber?: number;

  constructor(elementType: ElementType| string, elementNumber: number = null) {
    this.elementType = elementType;
    this.elementNumber = elementNumber;
  }

  toString() {
    return this.elementNumber === null ? this.elementType : `${this.elementType}_${this.elementNumber}`;
  }
}


class State {
  readonly elements  = new Map<ElementType, number>();
  readonly elementSize  = new Map<ElementType, number>();
  readonly currentElementColor = new Map<string, Color>();//ElementTypeAndNumber.toString as key
  readonly newElementColor = new Map<string, Color>();//ElementTypeAndNumber.toString as key

  equals(other: State): boolean {
    if (other === undefined) {
      return false;
    }
    let result = true;
    for (const field in this) {
      const thisField = this[field];
      if (!(thisField instanceof Map)) {
        continue;
      }
      result &&= this.propertyEqual(thisField, other[field]);
    }
    return result;
  }

  private propertyEqual(field1: Map<any, any>, field2: Map<any, any>): boolean {
    for(const key of field1.keys()){
      if (field1.get(key) !== field2.get(key)) {
        return false;
      }
    }[].find(it => it == "qwe".startsWith(""));
    return true;
  }

  copy(): State {
    const newState = new State();
    for (const field in this) {
      const thisField = this[field];
      if (!(thisField instanceof Map)) {
        continue;
      }
      this.copyProperty(thisField, newState[field]);
    }
    return newState;
  }

  private copyProperty(source: Map<any, any>, target: Map<any, any>) {
    source.forEach((value, key) => {
      target.set(key, value);
    });
  }

  getDifference(other: State): State {
    if (other === undefined) {
      return this;
    }
    const newState = new State();
    for (const field in this) {
      const thisField = this[field];
      if (!(thisField instanceof Map)) {
        continue;
      }
      this.getPropertyDifference(thisField, other[field], newState[field]);
    }
    return newState;
  }

  private getPropertyDifference(thisProperty: Map<any, any>, otherProperty: Map<any, any>, differenceProperty: Map<any, any>) {
    thisProperty.forEach((value, key) => {
      if (value !== otherProperty.get(key)) {
        differenceProperty.set(key, value);
      }
    });
  }
}
const LOTTIE_BODY = "{\"v\":\"5.9.0\",\"fr\":30,\"ip\":0,\"op\":90,\"w\":430,\"h\":430,\"nm\":\"avatar\",\"ddd\":0,\"assets\":[],{layersSpot}}";
const COLOR_DELTA = 0.0000001;

class Avatar {
  private readonly state : State = new State();
  private lastState : State;
  private readonly layersIndexes = new Map<ElementType, number[]>();
  private animation: Animation;
  private isInitialized = false;

  async init() {
    for (const  elementType of allElements) {
      this.state.elementSize[elementType] = 0;
      this.changeElement(new ChangeElementCommand(elementType, 1));
      await this.updateCurrentColors(elementType);
    }
    this.isInitialized = true;
  }

  private async updateCurrentColors(elementType: ElementType | string) {
    const elementTypeConfig = await ConfigService.getElementTypeConfig(elementType);
    const colorConfigs = elementTypeConfig.colorConfigs;

    colorConfigs.forEach(config =>{
      const key = new ElementTypeAndNumber(elementType, config.elementNumber).toString();
      this.state.currentElementColor.set(key, config.colors.find(it => it.isBasic));
    });
  }


  private addLottieBody(layersString: string) {
    return LOTTIE_BODY.replace("{layersSpot}", `"layers": [${layersString}]`);
  }


  changeElement(request: ChangeElementCommand) {
    this.state.elements.set(request.elementType, request.number);
  }
  //$[layer.ind].ks.s.k=[width,height, ???]
  changeSize(request: ChangeSizeCommand){
    this.state.elementSize.set(request.elementType, request.sizePercent);
  }
  changeColor(changeColorCommand: ChangeColorCommand) {
    const key = new ElementTypeAndNumber(changeColorCommand.elementType, changeColorCommand.elementNumber).toString();
    const value = ConfigService.getColorById(changeColorCommand.colorId);
    this.state.newElementColor.set(key.toString(), value);
  }

  private changeElementsSize() {
    const stateDifference = this.state.getDifference(this.lastState);
    stateDifference.elementSize.forEach((elementSize, elementType) => {
      if (elementSize === 0) {
        return;
      }
      const elementNumber = this.state.elements.get(elementType);
      const searchedLayerName =`${elementType}_${elementNumber}`;
      const layer = this.animation.layers.find(layer => layer.name.toUpperCase().startsWith(searchedLayerName));
      const scale = layer.transform.scale.toJSON();
      const sizeValues = scale.k;
      const newWidth = sizeValues[0] + (sizeValues[0] * this.state.elementSize.get(elementType) / 100);
      const newHeight = sizeValues[1] + (sizeValues[1] * this.state.elementSize.get(elementType) / 100);
      sizeValues[0] = newWidth;
      sizeValues[1] = newHeight;
      scale.k = sizeValues;
      layer.transform.scale = layer.transform.scale.fromJSON(scale);
    });
  }

  private changeElementsColor() {
    const stateDifference = this.state.getDifference(this.lastState);
    for (const [elementTypeAndNumber, newValue] of stateDifference.newElementColor) {
      const currentColor = this.state.currentElementColor.get(elementTypeAndNumber.toString());
      if (currentColor === undefined) {
        return;
      }
      const currentColorsRgbaArray = this.convertColor(currentColor);
      const newColorsRgbaArray = this.convertColor(newValue);
      if (currentColorsRgbaArray.length !== newColorsRgbaArray.length) {
        console.warn("Color arrays have different lengths");
        return;
      }
      for (let i = 0; i < currentColorsRgbaArray.length; i++) {
        const currentColorRgba = currentColorsRgbaArray[i];
        const newColorRgba = newColorsRgbaArray[i];

        //TODO doesn't work, need to change properties in layers
        const animationColorRgba = this.animation.colors
          .map(animationColor => animationColor as ColorRgba)
          .find(animationColor =>
            Math.abs(animationColor.r - currentColorRgba.r) < COLOR_DELTA &&
            Math.abs(animationColor.g - currentColorRgba.g) < COLOR_DELTA &&
            Math.abs(animationColor.b - currentColorRgba.b) < COLOR_DELTA
          );
        if (animationColorRgba !== undefined) {
          animationColorRgba.r = newColorRgba.r;
          animationColorRgba.g = newColorRgba.g;
          animationColorRgba.b = newColorRgba.b;
          this.state.currentElementColor.set(elementTypeAndNumber, newValue);
          console.log("asd");
        } else {
          console.warn("Color not found in animation: " + currentColorRgba.toJSON());
        }
      }
    }
  }

  private transformToLottie(jsonArray: string[]): Record<string, any> {
    const start = Date.now();

    // Extract the 'ind' value from the JSON strings using a regular expression
    const parsedArray = jsonArray.map(str => {
      const match = str.match(/"ind":(\d+)/);
      const ind = match ? Number(match[1]) : 0;
      return { str, ind };
    });

    // Sort the array using the extracted 'ind' values
    parsedArray.sort((a, b) => a.ind - b.ind);

    // Join the original strings of the sorted array
    const layers = parsedArray.map(item => item.str).join(",");

    const lottieJson = this.addLottieBody(layers);
    const result = JSON.parse(lottieJson);

    const timeTaken = Date.now() - start;
    console.log("Transform to lottie took: " + timeTaken + "ms");

    return result;
  }

  private async changeElements(animationType: string | AnimationType) {
    const stateDifference = this.state.getDifference(this.lastState);
    if (stateDifference.elements.size === 0) {
      return;
    }

    const elements = Array.from(stateDifference.elements.entries())
      .map(it => ({elementType: it[0], elementNumber: it[1]}));
    const layers = await findAnimation(animationType, elements, "MALE");
    const isFirstRequest = this.lastState === undefined;
    if (!isFirstRequest) { //if it's not first request, update required layers, otherwise keep all
      const changedTypes = Array.from(stateDifference.elements.keys()).map(it => it.toLowerCase());
      const layersToKeep = this.animation.layers
        .filter(layer => !changedTypes.includes(layer.name.split("_")[0].toLowerCase()))
        .map(layer => layer.toJSON())
        .map(layer => JSON.stringify(layer));
      layers.push(...layersToKeep);
    }
    const lottieJson = this.transformToLottie(layers.flat());
    this.animation = new Animation().fromJSON(lottieJson);
  }

  async getAnimation(animationType: string | AnimationType) {
    console.log("Requesting animation: " + animationType);
    if (!this.isInitialized) {
      await this.init();
    }
    if (this.state.equals(this.lastState)) {
      return this.animation;
    }
    await this.changeElements(animationType);
    this.changeElementsSize();
    this.changeElementsColor();
    this.lastState = this.state.copy();
    return this.animation;
  }

  private convertColor(source: Color): ColorRgba[] {
    const hexColors = [source.mainColor, source.strokeColor, ...source.additionalColors];
    return hexColors.map(hex => {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return new ColorRgba(r/255, g/255, b/255);
    });
  }

  private convertColorToHexArray(source: Color): string[] {
    return [source.mainColor, source.strokeColor, ...source.additionalColors];
  }
}

export default new Avatar();
