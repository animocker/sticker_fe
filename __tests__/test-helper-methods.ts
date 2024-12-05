import { State } from "../backend/avatar/State";
import { allElementsTypes } from "../model/enum";
import ColorService from "../backend/ColorService";
import { AnimationObject } from "lottie-react-native";

export function isAnimationsEquals(a: AnimationObject, b: AnimationObject) {
  a.nm = "";
  b.nm = "";
  return JSON.stringify(a) === JSON.stringify(b);
}

export async function createRandomState(): Promise<State> {
  const state = new State();

  for (const elementType of allElementsTypes) {
    state.elementSize.set(elementType, random(-50, 50));
    const elementNumber = random(1, 5); //TODO change 5 to actual number of elements
    state.elementNumber.set(elementType, elementNumber);
    const colorSets = await ColorService.getColorsForElement(elementType, elementNumber);
    if (colorSets.length > 0) {
      const randomColorSet = colorSets[random(0, colorSets.length)];
      state.elementColorSet.set(elementType, randomColorSet.id);
    }
  }
  return state;
}

export function random(from: number, to: number) {
  return Math.floor(Math.random() * (to - from) + from);
}
