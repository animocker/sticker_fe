import {Element} from "./elements";
import {db} from "./db";
import {AnimationType} from "./enum";

export interface Animation {
    uuid: string;
    type: string;
    value_array: string;
}

export const findByTypeAndElement = (animationType: string | AnimationType, value: Element): Animation => {
  try {
    console.log("Requesting animation: " + animationType + " " + value.type + ":" + value.idx_nbr);
    const result = db.getFirstSync<Animation>(
      "SELECT * FROM animation WHERE type = ? AND el_uuid = ?",
      [animationType, value.uuid]
    );
    //console.log("Type: " + animationType + " Element: " + value.type + ":" +value.idx_nbr + " Result: " + result.value_array);
    return result;
  } catch (error) {
    console.error(error);
    throw Error("Failed to get findByTypeAndElement from database");
  }
};
