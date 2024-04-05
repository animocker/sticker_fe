import {ElementEntity} from "../types/table.types";
import {AnimationType} from "../types/enum";
import {supabase} from "./supabase";

export const findByTypeAndElement = async (animationType: string | AnimationType, value: ElementEntity): Promise<string[]> => {
  console.log("Requesting animation: " + animationType + " " + value.type + ":" + value.idx_nbr);
  return supabase.from("animation")
    .select("value_array")
    .eq("type", animationType)
    .eq("el_uuid", value.uuid)
    .limit(1)
    .single()
    .throwOnError()
    .then(it => it.data.value_array);
};
