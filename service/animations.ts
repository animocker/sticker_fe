import {ElementEntity} from "../types/table.types";
import {AnimationType} from "../types/enum";
import {supabase} from "./supabase";

export const findByTypeAndElement = async (animationType: string | AnimationType, value: ElementEntity): Promise<string[]> => {
  console.log("Requesting animation: " + animationType + " " + value.type + ":" + value.idx_nbr);
  const response = await supabase.from("animation")
    .select("value_array")
    .eq("type", animationType)
    .eq("el_uuid", value.uuid)
    .limit(1)
    .single<string[]>();
  if (response.error) {
    throw Error(response.error.message);
  }
  return response.data;
};
