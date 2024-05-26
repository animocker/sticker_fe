import { appSchema, tableSchema } from "@nozbe/watermelondb";
import { colorSetsColorsSchema, colorSetsSchema, colorsSchema, layersSchema } from "./read-only/schema";

export default appSchema({
  version: 9,
  tables: [layersSchema, colorsSchema, colorSetsSchema, colorSetsColorsSchema],
});
