import {ElementType} from "../types/enum";
import {ElementEntity} from "../types/table.types";
import {supabase} from "./supabase";

export const findByTypeAndIndexNumber = async (elementType: string | ElementType, number: number): Promise<ElementEntity> => {

  // console.log("Requesting element: " + elementType + " " + number);//TODO in logs once Requesting element: undefined undefined why?
  const response = await supabase.from("element")
    .select("*")
    .eq("type", elementType)
    .eq("idx_nbr", number)
    .limit(1)
    .single<ElementEntity>();
  if (response.error) {
    throw Error(response.error.message);
  }
  return response.data;
};

export const findByType = async (elementType: string | ElementType): Promise<ElementEntity[]> => {
  const response = await supabase.from("element")
    .select("*")
    .eq("type", elementType)
    .returns<ElementEntity[]>();
  if (response.error) {
    throw Error(response.error.message);
  }
  return response.data;
};
