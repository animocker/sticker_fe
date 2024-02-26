import db from "./db";

export interface Element {
    uuid: string;
    type: string;
    idx_nbr: number;
    icon: String;
}


export const findByTypeAndIndexNumber = (elementType: string, number: number): Element => {
    try {
        console.log(elementType)
        console.log(number)
        const result = db.getFirstSync<Element>(
            `SELECT * FROM element WHERE type = ? AND idx_nbr = ?`,
            [elementType, number]
        )
        console.log(result)
        return result
    } catch (error) {
        console.error(error)
        throw Error("Failed to get findByTypeAndIndexNumber from database")
    }
}
