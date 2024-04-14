import {ElementEntity} from "./table.types";
import {AnimationType} from "./enum";
import {supabase} from "../supabase";

export const findAnimationByTypeAndElements = async (animationType: string | AnimationType, value: ElementEntity[]): Promise<string[]> => {
  console.log(`[Requesting animation:${animationType}]`);
  value.forEach(element => console.log(`[Requesting animation:${animationType}] ${element.type} ${element.idx_nbr}`));
  const elUuids = value.map(it => it.id);
  console.log("[UUIDS] " + elUuids);
  return supabase.from("animation")
    .select("value_array")
    .eq("type", animationType)
    .in("element_id", elUuids)
    .throwOnError()
    .then(response => response.data.map(it => it["value_array"]).flat());
};
