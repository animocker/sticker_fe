import { appSchema, tableSchema } from "@nozbe/watermelondb";
import { colorSetsColorsSchema, colorSetsSchema, colorsSchema, layersSchema } from "./read-only/schema";
import { avatarStateSchema } from "./read-write/schema";

export default appSchema({
  version: 10,
  tables: [layersSchema, colorsSchema, colorSetsSchema, colorSetsColorsSchema, avatarStateSchema],
});
