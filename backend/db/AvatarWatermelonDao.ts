import { AnimationType, ElementType } from "../../model/enum";
import { database } from "../watermelon-db/watermelon";
import { Q } from "@nozbe/watermelondb";
import { ColorSetColorWDB, ColorSetWDB, ColorWDB, ElementsColorSetsWDB, ElementsWDB, LayerWDB } from "../watermelon-db/read-only/model";

export async function getAnimationLayers(animationType: string | AnimationType, elementsIds: string[], gender: string): Promise<string[]> {
  const elementConditions = elementsIds.map(() => "(l.element_id = ?)").join(" OR ");

  const sqlQuery = `
    SELECT l.value
    FROM layers l
    WHERE l.animation_type = ?
    AND (${elementConditions})
    AND l.gender IN (?, 'UNISEX')
  `;

  const parameters = [animationType, ...elementsIds, gender];

  return database
    .get(LayerWDB.table)
    .query(Q.unsafeSqlQuery(sqlQuery, parameters))
    .unsafeFetchRaw()
    .then((result) => result.map((it) => it.value));
}

export async function getAllColorSets(): Promise<ColorSetWDB[]> {
  return database.get<ColorSetWDB>(ColorSetWDB.table).query().fetch();
}

export async function getElementsWithColorSets(): Promise<any[]> {
  return database
    .get(ElementsWDB.table)
    .query(Q.on(ElementsColorSetsWDB.table, "element_id", this.id))
    .fetch();
}
