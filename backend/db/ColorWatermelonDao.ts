import { ColorSetWDB, ElementsColorSetsWDB } from "../watermelon-db/read-only/model";
import { database } from "../watermelon-db/watermelon";
import { Q } from "@nozbe/watermelondb";

export async function getAllColorSets(): Promise<ColorSetWDB[]> {
  return database.get<ColorSetWDB>(ColorSetWDB.table).query().fetch();
}

export async function getColorSetById(id: string): Promise<ColorSetWDB> {
  return database
    .get<ColorSetWDB>(ColorSetWDB.table)
    .find(id)
    .catch((reason) => console.log(`Can't get color by id = ${id}`, reason));
}

export async function getColorSetsByElementId(elementId: string): Promise<ColorSetWDB[]> {
  return database
    .get<ColorSetWDB>(ColorSetWDB.table)
    .query(Q.on(ElementsColorSetsWDB.table, "element_id", elementId))
    .fetch();
}
