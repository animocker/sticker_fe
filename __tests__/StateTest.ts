import { getAnimationLayers } from "../backend/db/AvatarWatermelonDao";
import { allElements, AnimationType } from "../model/enum";
import { State } from "../backend/avatar/State";
import { supabase } from "../backend/supabase";
import initialize from "../backend/Initializer";
import configService from "../backend/ConfigService";

beforeAll(async () => {
  await supabase.auth.signInWithPassword({ email: process.env.TEST_LOGIN, password: process.env.TEST_PASSWORD });
  await initialize();
}, 10000);

it("Test equals", async () => {
  const state = new State();
  const state2 = new State();
  expect(state.equals(state2)).toBeTruthy();
  state.elementSize.set(allElements[0], 1);
  expect(state.equals(state2)).toBeFalsy();
  state2.elementSize.set(allElements[0], 1);
  expect(state.equals(state2)).toBeTruthy();
});

it("Test copy", async () => {
  const state = new State();
  const state2 = state.copy();
  expect(state.equals(state2)).toBeTruthy();
  state.elementSize.set(allElements[0], 1);
  expect(state.equals(state2)).toBeFalsy();
});

it("Test state serialization deserialization", async () => {
  const state = await createRandomState();
  const serialized = state.serialize();
  const deserialized = State.deserialize(serialized);
  expect(state.equals(deserialized)).toBeTruthy();
});

async function createRandomState(): Promise<State> {
  const state = new State();

  for (const elementType of allElements) {
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

function random(from, to) {
  return Math.floor(Math.random() * (to - from) + from);
}
