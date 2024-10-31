import { allElementsTypes, AnimationType, ElementType } from "../../model/enum";
import { ChangeColorCommand, ChangeElementCommand, ChangeSizeCommand, ChangeStateCommand } from "../../model/ChangeStateCommand";
import { getAnimationLayers } from "../db/AvatarWatermelonDao";
import { Animation, ColorRgba, Shape } from "@lottiefiles/lottie-js";
import { Color, ColorSet } from "../../model/Config";
import ConfigService from "../ConfigService";
import _ from "lodash";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";

import AsyncLock from "async-lock";
import { State } from "./State";
import { ElementTypeAndNumber } from "../../model/ElementTypeAndNumber";

const lock = new AsyncLock();
const getAvatarLockKey = "getAvatarLockKey";

const LOTTIE_BODY = '{"v":"5.9.0","fr":30,"ip":0,"op":90,"w":430,"h":430,"nm":"{nameSpot}","ddd":0,"assets":[],{layersSpot}}';

const redoStack: ChangeStateCommand[] = [];
const undoStack: ChangeStateCommand[] = [];

class Avatar {
  private state: State = new State();
  private lastState: State;
  private readonly layersIndexes = new Map<ElementType, number[]>();
  private avatarAnimation: Animation;
  private isInitialized = false;

  async init() {
    for (const elementType of allElementsTypes) {
      this.state.elementSize.set(elementType, 0);
      this.state.elements.set(elementType, 1);
      await this.updateCurrentColors(elementType);
    }
    this.isInitialized = true;
  }

  loadState(state: State) {
    this.state = state;
    this.isInitialized = true;
  }

  async getState() {
    if (!this.isInitialized) {
      await this.init();
    }
    return this.state;
  }
  undo() {
    const command = undoStack.pop();
    if (command) {
      command.rollback(this.state);
      redoStack.push(command);
    }
  }

  redo() {
    const command = redoStack.pop();
    if (command) {
      command.execute(this.state);
      undoStack.push(command);
    }
  }

  private async updateCurrentColors(elementType: ElementType | string) {
    const elementTypeConfig = await ConfigService.getElementTypeConfig(elementType);
    const colorSets = elementTypeConfig.colorSets;

    const groupedColorSets = _.groupBy(colorSets, (it) => new ElementTypeAndNumber(it.elementType, it.elementNumber));
    for (const key in groupedColorSets) {
      const colorSets = groupedColorSets[key] as ColorSet[];
      this.state.elementColorSet.set(key, colorSets[0].id);
    }
  }

  private addLottieBody(layersString: string) {
    return LOTTIE_BODY.replace("{layersSpot}", `"layers": [${layersString}]`).replace("{nameSpot}", uuid());
  }

  changeElement(command: ChangeElementCommand) {
    command.execute(this.state);
    undoStack.push(command);
  }
  //$[layer.ind].ks.s.k=[width,height, ???]
  changeSize(command: ChangeSizeCommand) {
    command.execute(this.state);
    undoStack.push(command);
  }
  changeColor(command: ChangeColorCommand) {
    command.execute(this.state);
    undoStack.push(command);
  }

  private changeElementsSize(lottieAnimation: Animation) {
    for (const [elementType, newSizeDiff] of this.state.elementSize) {
      if (newSizeDiff === 0 || elementType === undefined) {
        continue;
      }
      const elementNumber = this.state.elements.get(elementType);
      const searchedLayerName = `${elementType}_${elementNumber}`;
      const layers = lottieAnimation.layers.filter((layer) => layer.name.toUpperCase().startsWith(searchedLayerName));
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
    for (const [, newValueId] of this.state.elementColorSet) {
      const newValue = ConfigService.getColorSetById(newValueId);
      newValue.colors.forEach((color) => this.updateColor(lottieAnimation, color));
    }
  }

  private updateColor(lottieAnimation: Animation, newColor: Color) {
    const shapesToChange = lottieAnimation.layers.flatMap((layer) =>
      layer.shapes.flatMap((shape) => this.recursiveFindShapesByName(newColor.name, shape)),
    );
    shapesToChange.forEach((shape) => (shape.color.values[0].value = this.convertColor(newColor)));
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
    shape.shapes.forEach((it) => result.push(...this.recursiveFindShapesByName(name, it)));
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

  private async getAnimationForAllElements(animationType: string | AnimationType) {
    const elements = Array.from(this.state.elements.entries()).map((it) => `${it[0]}_${it[1]}`);
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
