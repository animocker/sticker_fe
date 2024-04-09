import {ElementEntity} from "../types/table.types";
import {AnimationType} from "../types/enum";
import {supabase} from "./supabase";

export const findByTypeAndElements = async (animationType: string | AnimationType, value: ElementEntity[]): Promise<string[]> => {
  console.log(`[Requesting animation:${animationType}]`);
  value.forEach(element => console.log(`[Requesting animation:${animationType}] ${element.type} ${element.idx_nbr}`));
  const elUuids = value.map(it => it.uuid);
  return supabase.from("animation")
    .select("value_array")
    .eq("type", animationType)
    .in("el_uuid", elUuids)
    .limit(1)
    .throwOnError()
    .then(it => it.data.value_array);
};
