import { Animation } from "@lottiefiles/lottie-js";
import { State } from "../backend/avatar/State";
import { allElementsTypes } from "../model/enum";
import configService from "../backend/ConfigService";

export function isAnimationsEquals(a: Animation, b: Animation) {
  a.name = "";
  b.name = "";
  return JSON.stringify(a) === JSON.stringify(b);
}

export async function createRandomState(): Promise<State> {
  const state = new State();

  for (const elementType of allElementsTypes) {
    state.elementSize.set(elementType, random(-50, 50));
    state.elements.set(elementType, random(1, 5));
    const elementTypeConfig = await configService.getElementTypeConfig(elementType);
    if (elementTypeConfig.colorSets.length > 0) {
      const randomColorSet = elementTypeConfig.colorSets[random(0, elementTypeConfig.colorSets.length)];
      state.elementColorSet.set(elementType.toString(), randomColorSet.id);
    }
  }
  return state;
}

export function random(from, to) {
  return Math.floor(Math.random() * (to - from) + from);
}
