import { tableSchema } from "@nozbe/watermelondb";
import { AvatarStateWDB } from "./model";

export const avatarStateSchema = tableSchema({
  name: AvatarStateWDB.table,
  columns: [
    { name: "value", type: "string" },
    { name: "user_id", type: "string" },
  ],
});
