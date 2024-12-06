import { allElementsTypes, AnimationType, ElementType } from "../../model/enum";
import { ChangeStateCommand } from "../../model/ChangeStateCommand";
import { getAnimationLayers } from "../db/AvatarWatermelonDao";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";

import AsyncLock from "async-lock";
import { ElementState, State } from "./State";
import ElementsService, { Color } from "../ElementsService";
import { AnimationObject } from "lottie-react-native";
import { storage } from "../mmkv";

const lock = new AsyncLock();
const getAvatarLockKey = "getAvatarLockKey";

//change fr and op to 1 for static animation
const LOTTIE_BODY = '{"v":"5.9.0","fr":1,"ip":0,"op":1,"w":430,"h":430,"nm":"{nameSpot}","ddd":0,"assets":[],{layersSpot}}';

const redoStack: ChangeStateCommand[] = [];
const undoStack: ChangeStateCommand[] = [];

class AvatarService {
  private state: State = new State();
  private lastState: State;
  private avatarAnimation: AnimationObject;
  private isInitialized = false;

  init() {
    for (const elementType of allElementsTypes) {
      this.state.elementSize.set(elementType, 0);
      this.state.elementNumber.set(elementType, 1);
      const elementNumber = this.state.elementNumber.get(elementType);
      const colorSets = ElementsService.getColorsForElement(elementType, elementNumber);
      if (colorSets && colorSets.length > 0) {
        this.state.elementColorSet.set(elementType, colorSets[0].id);
      }
    }
    this.isInitialized = true;
    storage.set("isNewAvatarAvailable", true);
  }

  loadState(state: State) {
    this.state = state;
    this.isInitialized = true;
  }

  getElementState(type: ElementType): ElementState {
    return this.state.getElementState(type);
  }

  getState() {
    if (!this.isInitialized) {
      this.init();
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

  private addLottieBody(layersString: string) {
    return LOTTIE_BODY.replace("{layersSpot}", `"layers": [${layersString}]`).replace("{nameSpot}", uuid());
  }

  executeCommand(command: ChangeStateCommand) {
    command.execute(this.state);
    undoStack.push(command);
    storage.set("isNewAvatarAvailable", true);
    console.log("new avatar");
  }

  //$[layer.ind].ks.s.k=[width,height, ???]
  private changeElementsSize(lottieAnimation: AnimationObject) {
    for (const [elementType, newSizeDiff] of this.state.elementSize) {
      if (newSizeDiff === 0 || elementType === undefined) {
        continue;
      }
      const elementNumber = this.state.elementNumber.get(elementType);
      const searchedLayerName = `${elementType}_${elementNumber}`;
      const layers = lottieAnimation.layers.filter((layer) => layer.nm.toUpperCase().startsWith(searchedLayerName));
      for (const layer of layers) {
        const sizes = layer.ks.s.k;
        if (typeof sizes[0] == "number") {
          //same sizes for all frames
          const newWidth = sizes[0] + (sizes[0] * newSizeDiff) / 100;
          const newHeight = sizes[1] + (sizes[1] * newSizeDiff) / 100;
          sizes[0] = newWidth;
          sizes[1] = newHeight;
        } else {
          //different sizes for different frames
          for (const frameSize of sizes) {
            const sizeValues = frameSize.s;
            const newWidth = sizeValues[0] + (sizeValues[0] * newSizeDiff) / 100;
            const newHeight = sizeValues[1] + (sizeValues[1] * newSizeDiff) / 100;
            sizeValues[0] = newWidth;
            sizeValues[1] = newHeight;
          }
        }
      }
    }
  }

  private async changeElementsColor(lottieAnimation: AnimationObject) {
    for (const [, newValueId] of this.state.elementColorSet) {
      const colors = await ElementsService.getColorSetById(newValueId).then((it) => it.colors);
      colors.forEach((color) => this.updateColor(lottieAnimation, color));
    }
  }

  private updateColor(lottieAnimation: AnimationObject, newColor: Color) {
    const shapesToChange = lottieAnimation.layers.flatMap((layer) =>
      layer.shapes.flatMap((shape) => this.recursiveFindShapesByName(newColor.name, shape)),
    );
    shapesToChange.forEach((shape) => (shape.c.k = this.convertColor(newColor)));
  }

  private recursiveFindShapesByName(name: string, shape: any) {
    if (shape === undefined) {
      return [];
    }
    const result: any[] = [];
    if (shape.nm === name) {
      return [shape];
    }
    if (shape.it === undefined) {
      return [];
    }
    shape.it.forEach((it) => result.push(...this.recursiveFindShapesByName(name, it)));
    return result;
  }

  private transformToLottie(jsonArray: string[]): AnimationObject {
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
    const elementsKeys = Array.from(this.state.elementNumber.entries())
      .filter((it) => it[1] !== 0)
      .map((it) => `${it[0]}_${it[1]}`);
    const layers = await getAnimationLayers(animationType, elementsKeys, "MALE");
    return this.transformToLottie(layers.flat());
  }

  async getAnimation(animationType: string | AnimationType) {
    if (!this.isInitialized) {
      this.init();
    }
    const result = await this.getAnimationForAllElements(animationType);
    this.changeElementsSize(result);
    await this.changeElementsColor(result);
    console.log("new avatar", result.nm);
    return result;
  }

  async getAvatar(): Promise<AnimationObject> {
    if (lock.isBusy(getAvatarLockKey)) {
      return this.avatarAnimation;
    }
    return lock
      .acquire(getAvatarLockKey, async () => {
        return await this.getAvatarInternal();
      })
      .then();
  }

  private async getAvatarInternal(): Promise<AnimationObject> {
    if (!this.isInitialized) {
      await this.init();
    }
    if (this.state.equals(this.lastState)) {
      return this.avatarAnimation;
    }
    this.avatarAnimation = await this.getAnimation(AnimationType.STATIC);
    this.lastState = this.state.copy();
    storage.set("isNewAvatarAvailable", false);
    return this.avatarAnimation;
  }

  private convertColor(source: Color): number[] {
    const hex = source.hex;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return [r / 255, g / 255, b / 255, 1];
  }
}

export default new AvatarService();
