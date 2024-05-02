import {findElementByTypeAndIndexNumber} from "./db/elements";
import {allElements, AnimationType, ElementType} from "../model/enum";
import {ChangeColorCommand, ChangeElementCommand, ChangeSizeCommand} from "../model/Command";
import {findAnimationByTypeAndElements} from "./db/animations";
import {findAnimation} from "./db/AvatarWatermelonDao";
import {Animation,  ColorRgba} from "@lottiefiles/lottie-js";
import {Color} from "../model/Config";
import ConfigService from "./ConfigService";

class ElementTypeAndNumber {
  readonly elementType: ElementType;
  readonly elementNumber?: number;

  constructor(elementType: ElementType, elementNumber: number = null) {
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
    return this.propertyEqual(this.elements, other.elements) &&
        this.propertyEqual(this.elementSize, other.elementSize) &&
        this.propertyEqual(this.currentElementColor, other.currentElementColor);
  }

  private propertyEqual(field1: Map<any, any>, field2: Map<any, any>): boolean {
    for(const key of field1.keys()){
      if (field1.get(key) !== field2.get(key)) {
        return false;
      }
    }
    return true;
  }

  copy(): State {
    const newState = new State();
    this.copyProperty(this.elements, newState.elements);
    this.copyProperty(this.elementSize, newState.elementSize);
    this.copyProperty(this.currentElementColor, newState.currentElementColor);
    this.copyProperty(this.newElementColor, newState.newElementColor);
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
    this.getPropertyDifference(this.elements, other.elements, newState.elements);
    this.getPropertyDifference(this.elementSize, other.elementSize, newState.elementSize);
    this.getPropertyDifference(this.currentElementColor, other.currentElementColor, newState.currentElementColor);
    this.getPropertyDifference(this.newElementColor, other.newElementColor, newState.newElementColor);
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

class Avatar {
  private readonly state : State = new State();
  private lastState : State;
  private readonly layersIndexes = new Map<ElementType, number[]>();
  private animation: Animation;
  private layers: Record<string, any>;


  constructor() {
    allElements.map(elementType => {
      this.state.elementSize[elementType] = 0;
      return this.changeElement(new ChangeElementCommand(elementType, 1));
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
    this.state.newElementColor.set(key, value);
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
    //TODO impl
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
    this.layers = layers.flat();
    const lottieJson = this.transformToLottie(layers.flat());
    this.animation = new Animation().fromJSON(lottieJson);
  }

  async getAnimation(animationType: string | AnimationType) {
    console.log("Requesting animation: " + animationType);
    if (this.state.equals(this.lastState)) {
      return this.animation;
    }
    await this.changeElements(animationType);
    this.changeElementsSize();
    this.changeElementsColor();
    this.lastState = this.state.copy();
    return this.animation;
  }

  private convertColor(hexColor: string): ColorRgba {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return new ColorRgba(r/255, g/255, b/255);
  }
}

export default new Avatar();
