import { supabase } from "../supabase";
import { State } from "../avatar/State";

//TODO add state to sqlite
export async function saveAvatarState(state: State): Promise<any> {
  /*  const userId = await supabase.auth.getUser().then((response) => response.data.user.id);
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
  });*/
}

export async function loadAvatarStates(): Promise<any[]> {
  const userId = supabase.auth.getUser().then((response) => response.data.user.id);
  /*  return database
    .get<AvatarStateWDB>(AvatarStateWDB.table)
    .query(Q.where("user_id", await userId))
    .fetch();*/
}
