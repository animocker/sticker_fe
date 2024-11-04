import { Model, Q } from "@nozbe/watermelondb";
import { field, immutableRelation, lazy } from "@nozbe/watermelondb/decorators";
import { colorSetsColorsSchema, colorSetsSchema, colorsSchema, elementsColorSetsSchema, elementsSchema, layersSchema } from "./schema";

//TODO add indexes
export class LayerWDB extends Model {
  static table = layersSchema.name;

  @field("animation_type") animationType!: string;
  @field("gender") gender!: string;
  @field("value") value!: string;

  @immutableRelation("elements", "element_id") elements;

  static associations = {
    elements: { type: "belongs_to", key: "element_id" },
  };
}

export class ColorSetWDB extends Model {
  static table = colorSetsSchema.name;

  @lazy elements = this.collections.get<ElementsWDB>(ElementsWDB.table).query(Q.on(ElementsColorSetsWDB.table, "color_set_id", this.id));
  @lazy colors = this.collections.get<ColorWDB>(ColorWDB.table).query(Q.on(ColorSetColorWDB.table, "color_set_id", this.id));

  static associations = {
    color_sets_colors_m2m: { type: "has_many", foreignKey: "color_set_id" },
    elements_color_sets_m2m: { type: "has_many", foreignKey: "color_set_id" },
  };
}

export class ColorWDB extends Model {
  static table = colorsSchema.name;

  @field("hex") hex!: string;
  @field("name") name!: string;
  @lazy color_sets = this.collections.get<ColorSetWDB>(ColorSetWDB.table).query(Q.on(ColorSetColorWDB.table, "color_id", this.id));

  static associations = {
    color_sets_colors_m2m: { type: "has_many", foreignKey: "color_id" },
  };
}

export class ColorSetColorWDB extends Model {
  static table = colorSetsColorsSchema.name;

  static associations = {
    colors: { type: "belongs_to", key: "color_id" },
    color_sets: { type: "belongs_to", key: "color_set_id" },
  };
  @immutableRelation("colors", "color_id") colors;
  @immutableRelation("color_sets", "color_set_id") color_sets;
}

export class ElementsWDB extends Model {
  static table = elementsSchema.name;

  @field("number") number!: number;
  @field("type") type!: string;

  @lazy color_sets = this.collections.get<ColorSetWDB>(ColorSetWDB.table).query(Q.on(ElementsColorSetsWDB.table, "element_id", this.id));
  @lazy layers = this.collections.get<LayerWDB>(LayerWDB.table).query(Q.where("element_id", this.id));

  static associations = {
    layers: { type: "has_many", foreignKey: "element_id" },
    elements_color_sets_m2m: { type: "has_many", foreignKey: "element_id" },
  };
}

export class ElementsColorSetsWDB extends Model {
  static table = elementsColorSetsSchema.name;

  static associations = {
    elements: { type: "belongs_to", key: "element_id" },
    color_sets: { type: "belongs_to", key: "color_set_id" },
  };
  @immutableRelation("elements", "element_id") elements;
  @immutableRelation("color_sets", "color_set_id") color_sets;
}
