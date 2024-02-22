import {
    enablePromise,
    openDatabase,
    SQLiteDatabase
} from "react-native-sqlite-storage"
import {findByTypeAndIndexNumber} from "./elements";

enablePromise(true)

let db: SQLiteDatabase;

class Database {

    constructor() {
        enablePromise(true);
        db = this.connectToDatabase();
        console.log(db);
    }

    connectToDatabase =  () => {
        return openDatabase(
            { name: "lottie.db", location: "default" },
            () => {},
            (error) => {
                console.error(error)
                throw Error("Could not connect to database")
            }
        )
    }

    findByTypeAndIndexNumber(elementType, number) {
        console.log("findByTypeAndIndexNumber start")
        return findByTypeAndIndexNumber(db, elementType, number);
        console.log("findByTypeAndIndexNumber end")
    }


    findByTypeAndElement(animationType, value) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`SELECT * FROM animation WHERE type = ? AND element = ?`, [animationType, value], (tx, results) => {
                    let data = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        data.push(results.rows.item(i));
                    }
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }


    // Define other methods (update, delete, select) in a similar way
}

export default new Database();
