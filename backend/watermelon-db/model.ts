import {Model} from "@nozbe/watermelondb";
import {field} from "@nozbe/watermelondb/decorators";


export class LayerWDB extends Model {
  static table = "layers";

  @field("animation_type") animationType!: string;
  @field("element_nbr") elementNbr!: number;
  @field("element_type") elementType!: string;
  @field("gender") gender!: string;
  @field("value") value!: string;
}

export class ColorWDB extends Model {
  static table = "colors";

  @field("additional_colors") additionalColors: string;
  @field("element_nbr") elementNbr: number;
  @field("element_type") elementType!: string;
  @field("is_basic") isBasic!: boolean;
  @field("main_color") mainColor!: string;
  @field("stroke_color") strokeColor!: string;
}
