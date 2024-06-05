import { allElements } from "../model/enum";
import { State } from "../backend/avatar/State";
import { supabase } from "../backend/supabase";
import initialize from "../backend/Initializer";
import { createRandomState } from "./test-helper-methods";

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
