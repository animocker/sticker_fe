import {Element} from "./elements";
import db from "./db";

export interface Animation {
    uuid: string;
    type: string;
    value_array: string;
}

export const findByTypeAndElement = (animationType: string, value: Element): Animation => {
    try {
        return db.getFirstSync<Animation>(
            `SELECT * FROM animation WHERE type = ? AND el_uuid = ?`,
            [animationType, value.uuid]
        )
    } catch (error) {
        console.error(error)
        throw Error("Failed to get findByTypeAndElement from database")
    }
}
