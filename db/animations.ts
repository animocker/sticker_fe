import {Element} from "./elements";
import {db} from "./db";
import {AnimationType} from "./enum";
import {supabase} from "../service/supabase";

export interface Animation {
    uuid: string;
    type: string;
    value_array: string;
}

export const findByTypeAndElement = async (animationType: string | AnimationType, value: Element): Promise<string[]> => {
  try {
    console.log("Requesting animation: " + animationType + " " + value.type + ":" + value.idx_nbr);
    const response = await supabase.from("animation")
      .select("value_array")
      .eq("type", animationType)
      .eq("el_uuid", value.uuid)
      .returns<string[]>();
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error("Failed to get findByTypeAndElement from database");
  }
};
