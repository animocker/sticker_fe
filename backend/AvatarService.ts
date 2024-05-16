import { allElements, AnimationType, ElementType } from "../model/enum";
import {
  ChangeColorCommand,
  ChangeElementCommand,
  ChangeSizeCommand,
} from "../model/Command";
import { getAnimationLayers } from "./db/AvatarWatermelonDao";
import { Animation, ColorRgba, Shape } from "@lottiefiles/lottie-js";
import { Color, ColorSet } from "../model/Config";
import ConfigService from "./ConfigService";
import _ from "lodash";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";

import AsyncLock from "async-lock";

const lock = new AsyncLock();
const getAvatarLockKey = "getAvatarLockKey";

class ElementTypeAndNumber {
  readonly elementType: ElementType | string;
  readonly elementNumber?: number;

  constructor(elementType: ElementType | string, elementNumber: number = null) {
    this.elementType = elementType;
    this.elementNumber = elementNumber;
  }

  toString() {
    return this.elementNumber === null
      ? this.elementType
      : `${this.elementType}_${this.elementNumber}`;
  }
}

class State {
  readonly elements = new Map<ElementType, number>();
  readonly elementSize = new Map<ElementType, number>();
  readonly currentElementColorSet = new Map<string, ColorSet>(); //ElementTypeAndNumber.toString as key
  readonly newElementColorSet = new Map<string, ColorSet>(); //ElementTypeAndNumber.toString as key

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
    for (const key of field1.keys()) {
      if (field1.get(key) !== field2.get(key)) {
        return false;
      }
    }
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

  private getPropertyDifference(
    thisProperty: Map<any, any>,
    otherProperty: Map<any, any>,
    differenceProperty: Map<any, any>,
  ) {
    thisProperty.forEach((value, key) => {
      if (value !== otherProperty.get(key)) {
        differenceProperty.set(key, value);
      }
    });
  }
}
const LOTTIE_BODY =
  "{\"v\":\"5.9.0\",\"fr\":30,\"ip\":0,\"op\":90,\"w\":430,\"h\":430,\"nm\":\"{nameSpot}\",\"ddd\":0,\"assets\":[],{layersSpot}}";

class Avatar {
  private readonly state: State = new State();
  private lastState: State;
  private readonly layersIndexes = new Map<ElementType, number[]>();
  private avatarAnimation: Animation;
  private isInitialized = false;

  async init() {
    for (const elementType of allElements) {
      this.state.elementSize[elementType] = 0;
      this.changeElement(new ChangeElementCommand(elementType, 1));
      await this.updateCurrentColors(elementType);
    }
    this.isInitialized = true;
  }

  private async updateCurrentColors(elementType: ElementType | string) {
    const elementTypeConfig =
      await ConfigService.getElementTypeConfig(elementType);
    const colorSets = elementTypeConfig.colorSets;

    const groupedColorSets = _.groupBy(
      colorSets,
      (it) => new ElementTypeAndNumber(it.elementType, it.elementNumber),
    );
    for (const key in groupedColorSets) {
      const colorSets = groupedColorSets[key];
      this.state.currentElementColorSet.set(key, colorSets[0]);
    }
  }

  private addLottieBody(layersString: string) {
    return LOTTIE_BODY.replace(
      "{layersSpot}",
      `"layers": [${layersString}]`,
    ).replace("{nameSpot}", uuid());
  }

  changeElement(request: ChangeElementCommand) {
    this.state.elements.set(request.elementType, request.number);
  }
  //$[layer.ind].ks.s.k=[width,height, ???]
  changeSize(request: ChangeSizeCommand) {
    this.state.elementSize.set(request.elementType, request.sizePercent);
  }
  changeColor(changeColorCommand: ChangeColorCommand) {
    const key = new ElementTypeAndNumber(
      changeColorCommand.elementType,
      changeColorCommand.elementNumber,
    ).toString();
    const value = ConfigService.getColorSetById(changeColorCommand.colorSetId);
    this.state.newElementColorSet.set(key.toString(), value);
  }

  private changeElementsSize(lottieAnimation: Animation) {
    for (const [elementType, newSizeDiff] of this.state.elementSize) {
      if (newSizeDiff === 0 || elementType === undefined) {
        continue;
      }
      const elementNumber = this.state.elements.get(elementType);
      const searchedLayerName = `${elementType}_${elementNumber}`;
      const layers = lottieAnimation.layers.filter((layer) =>
        layer.name.toUpperCase().startsWith(searchedLayerName),
      );
      for (const layer of layers) {
        const scale = layer.transform.scale;
        const framesSizes = scale.values;
        for (const frameSize of framesSizes) {
          const sizeValues = frameSize.value;
          const newWidth = sizeValues[0] + (sizeValues[0] * newSizeDiff) / 100;
          const newHeight = sizeValues[1] + (sizeValues[1] * newSizeDiff) / 100;
          sizeValues[0] = newWidth;
          sizeValues[1] = newHeight;
        }
      }
    }
  }

  private changeElementsColor(lottieAnimation: Animation) {
    const stateDifference = this.state.getDifference(this.lastState);

    for (const [, newValue] of stateDifference.newElementColorSet) {
      newValue.colors.forEach((color) =>
        this.updateColor(lottieAnimation, color),
      );
    }
  }

  private updateColor(lottieAnimation: Animation, newColor: Color) {
    const shapesToChange = lottieAnimation.layers.flatMap((layer) =>
      layer.shapes.flatMap((shape) =>
        this.recursiveFindShapesByName(newColor.name, shape),
      ),
    );
    shapesToChange.forEach(
      (shape) => (shape.color.values[0].value = this.convertColor(newColor)),
    );
  }

  private recursiveFindShapesByName(name: string, shape: Shape) {
    if (shape === undefined) {
      return [];
    }
    const result: Shape[] = [];
    if (shape.name === name) {
      return [shape];
    }
    if (shape.shapes === undefined) {
      return [];
    }
    shape.shapes.forEach((it) =>
      result.push(...this.recursiveFindShapesByName(name, it)),
    );
    return result;
  }

  private transformToLottie(jsonArray: string[]): Record<string, any> {
    // Extract the 'ind' value from the JSON strings using a regular expression
    const parsedArray = jsonArray.map((str) => {
      const match = str.match(/"ind":(\d+)/);
      const ind = match ? Number(match[1]) : 0;
      return { str, ind };
    });

    // Sort the array using the extracted 'ind' values
    parsedArray.sort((a, b) => a.ind - b.ind);

    // Join the original strings of the sorted array
    const layers = parsedArray.map((item) => item.str).join(",");

    const lottieJson = this.addLottieBody(layers);
    return JSON.parse(lottieJson);
  }

  private async changeStaticElements(animationType: string | AnimationType) {
    const stateDifference = this.state.getDifference(this.lastState);
    if (stateDifference.elements.size === 0) {
      return this.avatarAnimation;
    }
    const elements = Array.from(stateDifference.elements.entries()).map(
      (it) => ({ elementType: it[0], elementNumber: it[1] }),
    );
    const layers = await getAnimationLayers(animationType, elements, "MALE");
    if (this.avatarAnimation !== undefined) {
      const changedTypes = Array.from(stateDifference.elements.keys()).map(
        (it) => it.toLowerCase(),
      );
      const layersToKeep = this.avatarAnimation.layers
        .filter(
          (layer) =>
            !changedTypes.includes(layer.name.split("_")[0].toLowerCase()),
        )
        .map((layer) => layer.toJSON())
        .map((layer) => JSON.stringify(layer));
      layers.push(...layersToKeep);
    }
    const lottieJson = this.transformToLottie(layers.flat());
    return new Animation().fromJSON(lottieJson);
  }

  private async getAnimationForAllElements(
    animationType: string | AnimationType,
  ) {
    const elements = Array.from(this.state.elements.entries()).map((it) => ({
      elementType: it[0],
      elementNumber: it[1],
    }));
    const layers = await getAnimationLayers(animationType, elements, "MALE");
    const lottieJson = this.transformToLottie(layers.flat());
    return new Animation().fromJSON(lottieJson);
  }

  async getAnimation(animationType: string | AnimationType) {
    if (!this.isInitialized) {
      await this.init();
    }
    const result =
      /* animationType === AnimationType.IDLE
        ? await this.changeStaticElements(animationType)
        :*/ await this.getAnimationForAllElements(animationType);
    this.changeElementsSize(result);
    this.changeElementsColor(result);
    return result;
  }

  async getAvatar(): Promise<Animation> {
    if (lock.isBusy(getAvatarLockKey)) {
      return Promise.reject();
    }
    return lock
      .acquire(getAvatarLockKey, async () => {
        return await this.getAvatarInternal();
      })
      .then();
  }

  private async getAvatarInternal(): Promise<Animation> {
    if (!this.isInitialized) {
      await this.init();
    }
    if (this.state.equals(this.lastState)) {
      return this.avatarAnimation;
    }
    this.avatarAnimation = await this.getAnimation(AnimationType.IDLE);
    this.lastState = this.state.copy();
    return this.avatarAnimation;
  }

  private convertColor(source: Color): ColorRgba {
    const hex = source.hex;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return new ColorRgba(r / 255, g / 255, b / 255);
  }
}

export default new Avatar();
