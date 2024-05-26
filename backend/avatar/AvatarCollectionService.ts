import AvatarService from "./AvatarService";
import { supabase } from "../supabase";
import { AvatarStateWDB } from "../watermelon-db/read-write/model";
import { loadAvatarStates, saveAvatarState } from "../db/AvatarCollectionWatermelonDao";
import { State } from "./State";

//TODO make tests
class AvatarCollectionService {
  save() {
    return saveAvatarState(AvatarService.getState());
  }

  async load(): Promise<State[]> {
    const states = await loadAvatarStates();
    return states.map((it) => State.deserialize(it.value));
  }
}
