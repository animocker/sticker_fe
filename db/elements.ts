import {useSQLiteContext} from "expo-sqlite/next";
import {Element} from "./model";

const db = useSQLiteContext()

export const findByTypeAndIndexNumber =  (elementType: string, number: number): Element => {
    try {
        console.log(db)
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
