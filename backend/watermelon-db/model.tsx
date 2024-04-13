import { Model, Associations } from "@nozbe/watermelondb";
import {field, text, relation, children} from "@nozbe/watermelondb/decorators";

export class AnimationWDB extends Model {
  static table = "animations";
  static associations: Associations = {
    elements: { type: "belongs_to", key: "element_id" },
  }

  @field("type") type!: string;
  @field("uuid") uuid!: string;
  @text("value_array") valueArray!: string; // This will be a stringified version of the array
  @relation("elements", "element_id") element;
}

export class ElementWDB extends Model {
  static table = "elements";
  static associations: Associations = {
    animations: { type: "has_many", foreignKey: "element_id" },
  };
  @children("animations") animations;

  @field("gender") gender!: string | null;
  @field("icon") icon!: string | null;
  @field("idx_nbr") idxNbr!: number | null;
  @field("type") type!: string;
}
