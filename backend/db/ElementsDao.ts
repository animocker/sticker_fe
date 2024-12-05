import { ElementType } from "../../model/enum";
import { database } from "../watermelon-db/watermelon";
import { ElementsWDB } from "../watermelon-db/read-only/model";
import { Q } from "@nozbe/watermelondb";

export async function getElements(elementType: ElementType): Promise<ElementsWDB[]> {
  return database.get<ElementsWDB>(ElementsWDB.table).query(Q.where("type", elementType)).fetch();
}
