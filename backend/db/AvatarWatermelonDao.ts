import {AnimationType, ElementType} from "../../model/enum";
import {database} from "../watermelon-db/watermelon";
import {Q} from "@nozbe/watermelondb";
import {ColorWDB, LayerWDB} from "../watermelon-db/model";

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

export async function  findColors(
  elementType: string | ElementType,
  elementNumber: number = null
): Promise<ColorWDB[]> {
  console.log("findColors requested");
  return database.get<ColorWDB>(ColorWDB.table).query(
    Q.where("element_type", Q.eq(elementType)),
    Q.where("element_nbr", Q.eq(elementNumber))
  ).fetch();
}

export async function  getAllColors(): Promise<ColorWDB[]> {
  console.log("getAllColors requested");
  return database.get<ColorWDB>(ColorWDB.table).query().fetch();
}

export async function  findBasicColors(
  elementType: string | ElementType,
  elementNumber: number = null
): Promise<ColorWDB[]> {
  console.log("findBasicColors requested");
  return database.get<ColorWDB>(ColorWDB.table).query(
    Q.where("element_type", Q.eq(elementType)),
    Q.where("element_nbr", Q.eq(elementNumber)),
    Q.where("is_basic", Q.eq(true))
  ).fetch();
}
