import { AnimationType } from "../../model/enum";
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

  return [""];
  /*  return database
    .get(LayerWDB.table)
    .query(Q.unsafeSqlQuery(sqlQuery, parameters))
    .unsafeFetchRaw()
    .then((result) => result.map((it) => it.value));*/
}
