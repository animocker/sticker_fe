import {ElementType} from "../types/enum";
import {ElementEntity} from "../types/table.types";
import {supabase} from "./supabase";

export const findByTypeAndIndexNumber = async (elementType: string | ElementType, number: number): Promise<ElementEntity[]> => {

  console.log("Requesting element: " + elementType + " " + number);//TODO in logs once Requesting element: undefined undefined why?
  return supabase.from("element")
    .select()
    .eq("type", elementType)
    .eq("idx_nbr", number)
    .in("gender", ["MALE", "UNISEX"]) //TODO change to variable
    .limit(1)
    .throwOnError()
    .then(it => it.data);
};

export const findByType = async (elementType: string | ElementType): Promise<ElementEntity[]> => {
  return  supabase.from("element")
    .select()
    .eq("type", elementType)
    .returns<ElementEntity[]>()
    .throwOnError()
    .then(it => it.data);
};
