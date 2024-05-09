import {Model, Q} from "@nozbe/watermelondb";
import {field, immutableRelation, lazy} from "@nozbe/watermelondb/decorators";

//TODO add indexes
export class LayerWDB extends Model {
  static table = "layers";

  @field("animation_type") animationType!: string;
  @field("element_nbr") elementNbr!: number;
  @field("element_type") elementType!: string;
  @field("gender") gender!: string;
  @field("value") value!: string;
}

export class ColorSetWDB extends Model {
  static table = "color_sets";

  @field("element_nbr") elementNbr: number;
  @field("element_type") elementType!: string;

  static associations = {
    color_sets_colors: { type: "has_many", foreignKey: "color_set_id" },
  }
  @lazy
  colors = this.collections.get<ColorWDB>(ColorWDB.table)
    .query(Q.on(ColorSetColorWDB.table, "color_set_id", this.id));
}

export class ColorWDB extends Model {
  static table = "colors";

  @field("hex") hex!: string;
  @field("name") name!: string;

  static associations = {
    color_sets_colors: { type: "has_many", foreignKey: "color_id" },
  }
  @lazy
  color_sets = this.collections.get<ColorSetWDB>(ColorSetWDB.table)
    .query(Q.on(ColorSetColorWDB.table, "color_id", this.id));
}

export class ColorSetColorWDB extends Model {
  static table = "color_sets_colors";

  static associations = {
    colors: { type: "belongs_to", key: "color_id" },
    color_sets: { type: "belongs_to", key: "color_set_id" },
  }
  @immutableRelation("colors", "color_id") colors
  @immutableRelation("color_sets", "color_set_id") color_sets
}
