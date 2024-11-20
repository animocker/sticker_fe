export async function getAllColorSets(): Promise<any[]> {
  //return database.get<ColorSetWDB>(ColorSetWDB.table).query().fetch();
}

export async function getColorSetById(id: string): Promise<any> {
  //return database.get<ColorSetWDB>(ColorSetWDB.table).find(id);
}

export async function getColorSetsByElementId(elementId: string): Promise<any[]> {
  /*  return database
    .get<ColorSetWDB>(ColorSetWDB.table)
    .query(Q.on(ElementsColorSetsWDB.table, "element_id", elementId))
    .fetch();*/
}
