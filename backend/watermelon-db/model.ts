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
