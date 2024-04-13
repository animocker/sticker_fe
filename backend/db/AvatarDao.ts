import {AnimationType, ElementType} from "./enum";
import {database} from "../watermelon-db/watermelon";
import {Q} from "@nozbe/watermelondb";

export async function  findAnimation(
  animationType: string | AnimationType,
  elements: {elementType: string | ElementType, elementNumber: number}[],
  gender: string
):Promise<string[]> {
  const elementConditions = elements.map(() =>
    "(e.type = ? AND e.idx_nbr = ?)"
  ).join(" OR ");

  const sqlQuery = `
    SELECT a.value_array
    FROM animations a
    JOIN elements e ON e.id = a.element_id
    WHERE a.type = ?
    AND (${elementConditions})
    AND e.gender IN (?, 'UNISEX')
  `;

  const parameters = [
    animationType,
    ...elements.flatMap(({elementType, elementNumber}) => [elementType, elementNumber]),
    gender
  ];
  return database.get("animations").query(
    Q.unsafeSqlQuery(sqlQuery, parameters)
  ).unsafeFetchRaw().then(result => result.map((it) => it.value_array));
}

