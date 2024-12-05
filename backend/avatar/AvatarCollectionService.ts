import AvatarService from "./AvatarService";
import { loadAvatarStates, saveAvatarState } from "../db/AvatarCollectionWatermelonDao";
import { State } from "./State";

//TODO make tests
class AvatarCollectionService {
  saveCurrentState() {
    const state = AvatarService.getState();
    return saveAvatarState(state);
  }

  async load(): Promise<State[]> {
    const states = await loadAvatarStates();
    return states.map((it) => State.deserialize(it.value));
  }
}

export default new AvatarCollectionService();
