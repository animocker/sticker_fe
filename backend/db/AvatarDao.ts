import {AnimationType, ElementType} from "./enum";
import {database} from "../watermelon-db/watermelon";
import {Q} from "@nozbe/watermelondb";
import {LayerWDB} from "../watermelon-db/model";

export async function  findAnimation(
  animationType: string | AnimationType,
  elements: {elementType: string | ElementType, elementNumber: number}[],
  gender: string
): Promise<string[]> {
  const elementConditions = elements.map(() =>
    "(l.element_type = ? AND l.element_nbr = ?)"
  ).join(" OR ");

  const sqlQuery = `
    SELECT l.value
    FROM layers l
    WHERE l.animation_type = ?
    AND (${elementConditions})
    AND l.gender IN (?, 'UNISEX')
  `;

  const parameters = [
    animationType,
    ...elements.flatMap(({elementType, elementNumber}) => [elementType, elementNumber]),
    gender
  ];

  return database.get(LayerWDB.table).query(
    Q.unsafeSqlQuery(sqlQuery, parameters)
  ).unsafeFetchRaw().then(result => result.map((it) => it.value));
}
