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
    console.log("Requesting element: " + elementType + " " + number);//TODO in logs once Requesting element: undefined undefined why?
    const result = db.getFirstSync<Element>(
      "SELECT * FROM element WHERE type = ? AND idx_nbr = ?",
      [elementType, number]
    );
    //console.log("Type: " + elementType + " Number: " + number + " Result: " + JSON.stringify(result));
    return result;
  } catch (error) {
    console.error(error);
    throw Error("Failed to get findByTypeAndIndexNumber from database");
  }
};
