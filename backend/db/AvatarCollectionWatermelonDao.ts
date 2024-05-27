import { supabase } from "../supabase";
import { database } from "../watermelon-db/watermelon";
import { State } from "../avatar/State";
import { AvatarStateWDB } from "../watermelon-db/read-write/model";
import { Q } from "@nozbe/watermelondb";

export async function saveAvatarState(state: State): Promise<AvatarStateWDB> {
  const userId = await supabase.auth.getUser().then((response) => response.data.user.id);
  return database.write(async () => {
    if (state.id) {
      return database
        .get<AvatarStateWDB>(AvatarStateWDB.table)
        .find(state.id)
        .then((existedState) => {
          if (existedState.userId === userId) {
            return existedState.update((it) => (it.value = state.serialize()));
          } else {
            throw new Error("User does not own this state");
          }
        });
    } else {
      return database.get<AvatarStateWDB>(AvatarStateWDB.table).create((newState) => {
        newState.value = state.serialize();
        newState.userId = userId;
      });
    }
  });
}

export async function loadAvatarStates(): Promise<AvatarStateWDB[]> {
  const userId = supabase.auth.getUser().then((response) => response.data.user.id);
  return database
    .get<AvatarStateWDB>(AvatarStateWDB.table)
    .query(Q.where("user_id", await userId))
    .fetch();
}
