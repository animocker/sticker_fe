import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { LayerWDB, ColorWDB, ColorSetWDB, ColorSetColorWDB } from "./read-only/model";
import { supabase } from "../supabase";
import { SyncDatabaseChangeSet, synchronize } from "@nozbe/watermelondb/sync";
import schema from "./schema";
import { AvatarStateWDB } from "./read-write/model";
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  //migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  //jsi: true, /* Platform.OS === 'ios' */
  // (optional, but you should implement this method)
  onSetUpError: (error) => {
    // Database failed to load -- offer the user to reload the app or log out
  },
});

// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: [LayerWDB, ColorWDB, ColorSetWDB, ColorSetColorWDB, AvatarStateWDB],
});

export async function sync() {
  //await database.write(async () => await database.unsafeResetDatabase());
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      const { data, error } = await supabase.rpc("pull", {
        last_pulled_at: lastPulledAt,
      });

      const { changes, timestamp } = data as {
        changes: SyncDatabaseChangeSet;
        timestamp: number;
      };

      return { changes, timestamp };
    },
    pushChanges: async ({ changes, lastPulledAt }) => {},
  });
}
