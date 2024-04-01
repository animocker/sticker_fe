import {db} from "./db";
import {ElementType} from "./enum";

export interface Element {
    uuid: string;
    type: string;
    idx_nbr: number;
    icon: string;
}


export const findByTypeAndIndexNumber = (elementType: string | ElementType, number: number): Element => {
  try {
    // console.log("Requesting element: " + elementType + " " + number);//TODO in logs once Requesting element: undefined undefined why?
    return db.getFirstSync<Element>(
      "SELECT * FROM element WHERE type = ? AND idx_nbr = ?",
      [elementType, number]
    );
  } catch (error) {
    console.error(error);
    throw Error("Failed to get findByTypeAndIndexNumber from database");
  }
};

export const findByType = (elementType: string | ElementType): Element[] => {
  try {
    return db.getAllSync<Element>(
      "SELECT * FROM element WHERE type = ?",
      [elementType]
    );
  } catch (error) {
    console.error(error);
    throw Error("Failed to get findByTypeAndIndexNumber from database");
  }
};
