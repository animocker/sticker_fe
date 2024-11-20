import AvatarService from "./AvatarService";
import { loadAvatarStates, saveAvatarState } from "../db/AvatarCollectionLocalDao";
import { State } from "./State";

//TODO make tests
class AvatarCollectionService {
  saveCurrentState() {
    return AvatarService.getState().then((state) => saveAvatarState(state));
  }

  async load(): Promise<State[]> {
    const states = await loadAvatarStates();
    return states.map((it) => State.deserialize(it.value));
  }
}

export default new AvatarCollectionService();
