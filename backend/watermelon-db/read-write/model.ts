import { Model, Q } from "@nozbe/watermelondb";
import { field, immutableRelation, lazy } from "@nozbe/watermelondb/decorators";

export class AvatarStateWDB extends Model {
  static table = "avatar_states";

  @field("value") value!: string; //json State
  @field("user_id") userId!: string;
}
