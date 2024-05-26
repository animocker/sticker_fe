import { supabase } from "../supabase";
import { database } from "../watermelon-db/watermelon";
import { State } from "../avatar/State";
import AvatarService from "../avatar/AvatarService";
import { AvatarStateWDB } from "../watermelon-db/read-write/model";

export async function saveAvatarState(state: State): Promise<AvatarStateWDB> {
  const userId = supabase.auth.getUser().then((response) => response.data.user.id);
  const res = await database.write(async () => {
    if (state.id) {
      return database
        .get<AvatarStateWDB>(AvatarStateWDB.table)
        .find(state.id)
        .then((existedState) => {
          if (existedState.userId === (await userId)) {
            return await existedState.update((it) => (it.value = state.serialize()));
          } else {
            throw new Error("User does not own this state");
          }
        });
    } else {
      return database.get<AvatarStateWDB>(AvatarStateWDB).create((newState) => {
        newState.value = state.serialize();
        newState.userId = await userId;
      });
    }
  });
}

export async function loadAvatarStates(): Promise<AvatarStateWDB[]> {
  const userId = supabase.auth.getUser().then((response) => response.data.user.id);
  return database
    .get<AvatarStateWDB>(AvatarStateWDB.table)
    .query(Q.where("userId", await userId))
    .fetch();
}
