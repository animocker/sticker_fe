import { supabase } from "../../backend/supabase";
import initialize from "../../backend/Initializer";
import AvatarService from "../../backend/avatar/AvatarService";
import AvatarCollectionService from "../../backend/avatar/AvatarCollectionService";
import { State } from "../../backend/avatar/State";
import { createRandomState, isAnimationsEquals } from "../test-helper-methods";

it("Avatar's new state could be saved and loaded", async () => {
  let randomState = await createRandomState();
  AvatarService.loadState(randomState);
  const originalAnimation = await AvatarService.getAvatar();
  const savedState = await AvatarCollectionService.saveCurrentState();

  randomState = await createRandomState();
  AvatarService.loadState(randomState);

  const changedAnimation = await AvatarService.getAvatar();
  expect(changedAnimation).not.toBe(originalAnimation);

  const savedStates = await AvatarCollectionService.load();
  expect(savedStates.length).toBe(1);
  expect(savedStates[0].equals(State.deserialize(savedState.value))).toBeTruthy();

  AvatarService.loadState(savedStates[0]);
  const loadedAnimation = await AvatarService.getAvatar();
  expect(isAnimationsEquals(originalAnimation, loadedAnimation)).toBeTruthy();
});
