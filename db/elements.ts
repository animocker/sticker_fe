import {db} from "./db";
import {ElementType} from "./enum";

export interface Element {
    uuid: string;
    type: string;
    idx_nbr: number;
    icon: String;
}


export const findByTypeAndIndexNumber = (elementType: string | ElementType, number: number): Element => {
    try {
        return db.getFirstSync<Element>(
            `SELECT * FROM element WHERE type = ? AND idx_nbr = ?`,
            [elementType, number]
        )
    } catch (error) {
        console.error(error)
        throw Error("Failed to get findByTypeAndIndexNumber from database")
    }
}
