import {SQLiteDatabase} from "react-native-sqlite-storage";

export interface Element {
    id: number;
    type: string;
    idx_nbr: number;
}

export const findByTypeAndIndexNumber = async (db: SQLiteDatabase, elementType: String, number: Number): Promise<Element> => {
    try {
        console.log(db.dbname)
        const results = await db.executeSql(`SELECT * FROM element WHERE type = ? AND idx_nbr = ?`, [elementType, number])
        console.log(results)
        if (results.length !== 1) {
            console.log("findByTypeAndIndexNumber: No element found")
            return null;
        } else {
            return results[0];
        }
    } catch (error) {
        console.error(error)
        throw Error("Failed to get findByTypeAndIndexNumber from database")
    }
}
