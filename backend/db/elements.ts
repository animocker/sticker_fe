import {ElementType} from "../../model/enum";
import {ElementEntity} from "./table.types";
import {supabase} from "../supabase";

export const findElementByTypeAndIndexNumber = async (elementType: string | ElementType, number: number): Promise<ElementEntity[]> => {

  console.log("Requesting element: " + elementType + " " + number);//TODO in logs once Requesting element: undefined undefined why?
  return supabase.from("element")
    .select()
    .eq("type", elementType)
    .eq("idx_nbr", number)
    .in("gender", ["MALE", "UNISEX"]) //TODO change to variable
    .throwOnError()
    .then(it => it.data);
};

export const findElementsByType = async (elementType: string | ElementType): Promise<ElementEntity[]> => {
  return  supabase.from("element")
    .select()
    .eq("type", elementType)
    .returns<ElementEntity[]>()
    .throwOnError()
    .then(it => it.data);
};
