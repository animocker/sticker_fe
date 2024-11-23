import { allElementsTypes } from "../../model/enum";
import { State } from "../../backend/avatar/State";
import { supabase } from "../../backend/supabase";
import initialize from "../../backend/Initializer";
import { createRandomState } from "../test-helper-methods";

it("Test equals", async () => {
  const state = new State();
  const state2 = new State();
  expect(state.equals(state2)).toBeTruthy();
  state.elementSize.set(allElementsTypes[0], 1);
  expect(state.equals(state2)).toBeFalsy();
  state2.elementSize.set(allElementsTypes[0], 1);
  expect(state.equals(state2)).toBeTruthy();
});

it("Test copy", async () => {
  const state = new State();
  const state2 = state.copy();
  expect(state.equals(state2)).toBeTruthy();
  state.elementSize.set(allElementsTypes[0], 1);
  expect(state.equals(state2)).toBeFalsy();
});

it("Test state serialization deserialization", async () => {
  const state = await createRandomState();
  const serialized = state.serialize();
  const deserialized = State.deserialize(serialized);
  expect(state.equals(deserialized)).toBeTruthy();
});
